import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Input,
  Button,
  Switch,
  Box,
  Typography,
  Card,
  CardContent,
} from '@mui/joy';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Message from '@/components/Message/Message';
import Grid from '@mui/joy/Grid';
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

  const handleClose = () => {
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
      } else {
        showMessage(response.msg || '提交失败', 'danger');
        console.error(response.msg || '提交失败');
      }
    } catch (error) {
      console.error('请求失败');
    }
  };

  return (
    (<Box sx={{ p: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <FormControl required>
                  <FormLabel>
                    账号
                  </FormLabel>
                  <Input
                    fullWidth
                    placeholder="请输入 Zepp Life 账号"
                    value={dataForm.user_name}
                    onChange={(e) => setDataForm({ ...dataForm, user_name: e.target.value })}
                    error={!!errors.user_name}
                    margin="normal" />

                </FormControl>
              </Grid>
              <Grid xs={12}>
                <FormControl required>
                  <FormLabel>
                    密码
                  </FormLabel>
                  <Input
                    fullWidth
                    type="password"
                    placeholder="请输入 Zepp Life 密码"
                    value={dataForm.password}
                    onChange={(e) => setDataForm({ ...dataForm, password: e.target.value })}
                    error={!!errors.password}
                    margin="normal" />

                </FormControl>
              </Grid>
              <Grid xs={12}>
                <FormControl required>
                  <FormLabel>
                    步数
                  </FormLabel>
                  <Input
                    fullWidth
                    placeholder="请输入步数"
                    type="number"
                    value={dataForm.step}
                    onChange={(e) => setDataForm({ ...dataForm, step: e.target.value })}
                    error={!!errors.step}
                    margin="normal" />

                </FormControl>
              </Grid>
              <Grid xs={12}>
                <Typography component="label" endDecorator={<Switch
                  checked={dataForm.is_save}
                  onChange={(e) => setDataForm({ ...dataForm, is_save: e.target.checked })}
                />}>
                  记住账号密码
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Button variant="solid" color="primary" fullWidth type="submit" sx={{ borderRadius: '50px', py: 1 }}>
          提交
        </Button>
      </form>
      {/* 使用说明 */}
      <Box sx={{ mt: 4, p: 2, backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 1 }}>
        <Typography level="h6" color="danger" gutterBottom>
          使用说明:
        </Typography>
        <Typography level="body2">
          1、首次使用请在应用商店中下载 [Zepp Life] APP，打开软件并选择'没有账号立即注册'，一定要新注册不能用第三方账号授权登录
        </Typography>
        <Typography level="body2">
          2、进入 [Zepp Life] app，依次点击: 我的 &rarr; 第三方接入 &rarr; 绑定你想同步数据的平台。
        </Typography>
        <Typography level="body2">
          3、使用此小程序进行提交。
        </Typography>
        <Typography level="body2" color="danger">
          4、特别注意: 首次提交后因账号刚注册官方安全限制第一次不会同步,需要等 24 小时后再来提交方可同步,后续使用不再有此限制
        </Typography>
        <Typography level="body2">
          5、仅供学习交流，严禁用于商业用途，请于24小时内删除。
        </Typography>
      </Box>
      <Message
        open={open}
        message={message}
        severity={severity}
        onClose={handleClose}
      />
    </Box>)
  );
}
