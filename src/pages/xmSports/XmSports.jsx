import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Box,
  Typography,
  Card,
  CardContent
} from '@mui/material';
import Message from '@/components/Message/Message';
import Grid from '@mui/material/Grid2';
import { postXmPorts } from '@/app/index';

export default function HomeForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [dataForm, setDataForm] = useState({
    user_name: '',
    password: '',
    step: '',
    is_save: false,
  });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const showMessage = (msg, severity) => {
    setMessage(msg);
    setSeverity(severity);
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    setOpen(false);
  };

  useEffect(() => {
    const user_name = localStorage.getItem('user_name');
    const password = localStorage.getItem('password');

    if (user_name && password) {
      setDataForm({ ...dataForm, user_name, password, is_save: true });
    }
  }, []);

  const saveUserInfo = (is_save) => {
    if (is_save) {
      localStorage.setItem('user_name', dataForm.user_name);
      localStorage.setItem('password', dataForm.password);
    } else {
      localStorage.removeItem('user_name');
      localStorage.removeItem('password');
    }
  };

  const onSubmit = async (formData) => {
    const { user_name, password, step, is_save } = dataForm;
    try {
      const response = await postXmPorts({ user: user_name, password, step });
      if (response.code === 200) {
        saveUserInfo(is_save);
        showMessage(response.msg || '提交成功', 'success');
        setOpen(true);
      } else {
        showMessage(response.msg || '提交失败', 'error');
        console.error(response.msg || '提交失败');
      }
    } catch (error) {
      console.error('请求失败');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="账号"
                  placeholder="请输入 Zepp Life 账号"
                  {...register('user_name', { required: '请输入 Zepp Life 账号' })}
                  value={dataForm.user_name}
                  onChange={(e) => setDataForm({ ...dataForm, user_name: e.target.value })}
                  error={!!errors.user_name}
                  helperText={errors.user_name?.message}
                  margin="normal"
                  required
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  type="password"
                  label="密码"
                  placeholder="请输入 Zepp Life 密码"
                  {...register('password', { required: '请输入 Zepp Life 密码' })}
                  value={dataForm.password}
                  onChange={(e) => setDataForm({ ...dataForm, password: e.target.value })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  margin="normal"
                  required
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="步数"
                  placeholder="请输入步数"
                  type="number"
                  {...register('step', { required: '请输入步数' })}
                  value={dataForm.step}
                  onChange={(e) => setDataForm({ ...dataForm, step: e.target.value })}
                  error={!!errors.step}
                  helperText={errors.step?.message}
                  margin="normal"
                  required
                />
              </Grid>
              <Grid size={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={dataForm.is_save}
                      onChange={(e) => setDataForm({ ...dataForm, is_save: e.target.checked })}
                    />
                  }
                  label="记住账号密码"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Button variant="contained" color="primary" fullWidth type="submit" sx={{ borderRadius: '50px', py: 1 }}>
          提交
        </Button>
      </form>

      {/* 使用说明 */}
      <Box sx={{ mt: 4, p: 2, backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 1 }}>
        <Typography variant="h6" color="error" gutterBottom>
          使用说明:
        </Typography>
        <Typography variant="body2">
          1、首次使用请在应用商店中下载 [Zepp Life] APP，打开软件并选择'没有账号立即注册'，一定要新注册不能用第三方账号授权登录
        </Typography>
        <Typography variant="body2">
          2、进入 [Zepp Life] app，依次点击: 我的 &rarr; 第三方接入 &rarr; 绑定你想同步数据的平台。
        </Typography>
        <Typography variant="body2">
          3、使用此小程序进行提交。
        </Typography>
        <Typography variant="body2" color="error">
          4、特别注意: 首次提交后因账号刚注册官方安全限制第一次不会同步,需要等 24 小时后再来提交方可同步,后续使用不再有此限制
        </Typography>
        <Typography variant="body2">
          5、仅供学习交流，严禁用于商业用途，请于24小时内删除。
        </Typography>
      </Box>

      <Message
        open={open}
        message={message}
        severity={severity}
        onClose={handleClose}
      />
    </Box>
  );
}
