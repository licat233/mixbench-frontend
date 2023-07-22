import { putPassword } from '@/services/swagger/admin';
import type { PutPasswordReq } from '@/services/swagger/adminComponents';
import { getMathCaptcha } from '@/services/swagger/authentication';
import { CaptchaInfo, CaptchaReq } from '@/services/swagger/authenticationComponents';
import { SafetyCertificateOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { FC, useState } from 'react';
import styles from './style.less';
import { DrawerForm, ProFormText, ProFormItem, ProFormDigit } from '@ant-design/pro-components';
import { useForm } from 'antd/lib/form/Form';

type PutPasswordModalProps = {
    open: boolean;
    onDone: () => void;
}

const PutPasswordModal: FC<PutPasswordModalProps> = (props) => {
    const { open: visible, onDone } = props
    const [imgCaptcha, setImgCaptcha] = useState<CaptchaInfo>()
    const [done, setDone] = useState<boolean>(false)
    const [form] = useForm<PutPasswordReq>()

    const getCaptchaImage = async () => {
        if (done) return;
        try {
            const captchaParams: CaptchaReq = {
                height: 40,
                width: 150,
                BgColor: {
                    R: 254,
                    G: 254,
                    B: 254,
                    A: 254,
                },
            };
            const result = await getMathCaptcha(captchaParams);
            setImgCaptcha((result as API.BaseResp).data as CaptchaInfo);
        } catch (error) {
            message.error('获取验证码失败！');
        }
    };

    const onDoneHandle = () => {
        setDone(true)
        onDone()
    }

    const onSubmit = async (req: PutPasswordReq): Promise<boolean> => {
        try {
            const { success } = await putPassword(req)
            if (success) {
                message.success("修改成功")
            }
            return success
        } catch (error) {
            message.error("修改失败")
        }
        return false
    }

    const onVisibleChange = () => {
        getCaptchaImage();
    }

    const confirmPassword = (pwd1: string, pwd2: string): boolean => {
        if (!pwd1 || !pwd2) return true
        return pwd1 === pwd2;
    }

    const [ruleTigger, setRuleTigger] = useState<number>()
    return (
        <DrawerForm<PutPasswordReq>
            open={visible}
            title="修改密码"
            form={form}
            autoFocusFirstInput
            drawerProps={{
                destroyOnClose: true,
                onClose: () => onDoneHandle(),
            }}
            onOpenChange={onVisibleChange}
            width={375}
            onFinish={async (values) => {
                if (!imgCaptcha?.captchaId) {
                    message.error("not found captcha");
                    return false
                }
                const req = {
                    oldPassword: values.oldPassword,
                    newPassword: values.newPassword,
                    captchaId: imgCaptcha.captchaId,
                    solution: values.solution + "",
                }
                const ok = await onSubmit(req)
                if (!ok) {
                    getCaptchaImage();
                    throw new Error()
                }
                return ok;
            }}
        >
            <ProFormText.Password
                rules={[
                    {
                        required: true,
                        message: '原密码为必填项',
                    },
                    {
                        pattern: /^.{6,34}$/,
                        message: '原密码长度有误',
                    },
                ]}
                width="md"
                name="oldPassword"
                label="原密码"
            />
            <ProFormText.Password
                rules={[
                    {
                        required: true,
                        message: '新密码为必填项',
                    },
                    {
                        pattern: /^.{6,34}$/,
                        message: '新密码长度有误',
                    },
                ]}
                width="md"
                name="newPassword"
                label="新密码"
            />
            <ProFormText.Password
                rules={[
                    {
                        required: true,
                        message: '确认密码为必填项',
                    },
                    {
                        pattern: /^.{6,34}$/,
                        message: '确认密码长度有误',
                    },
                    {
                        len: ruleTigger,  //无法得知antd如何实现主动提示，暂时使用该方案
                        message: '密码不一致'
                    }
                ]}
                width="md"
                name="newPassword2"
                label="确认密码"
                fieldProps={{
                    onChange: (e) => {
                        const pwd1 = form.getFieldValue('newPassword')
                        const pwd2 = e.currentTarget.value;
                        const ok = confirmPassword(pwd1, pwd2);
                        if (!ok) {
                            setRuleTigger(0);
                        }else{
                            setRuleTigger(undefined);
                        }
                    }
                }}

            />
            <ProFormItem>
                <ProFormDigit
                    rules={[
                        {
                            required: true,
                            message: '请输入验证码！',
                        },
                        {
                            pattern: /^-?\d{1,4}$/,
                            message: '验证码格式错误！',
                        },
                    ]}
                    key="accountSolution"
                    name="solution"
                    fieldProps={{
                        size: 'large',
                        prefix: <SafetyCertificateOutlined className={styles.prefixIcon} />,
                    }}
                    width="sm"
                    label="验证码"
                />
                <div className={styles.captchaimg} key="accountCaptchaImag" onClick={getCaptchaImage}>
                    <img src={imgCaptcha?.base64Image || ''} />
                </div>
            </ProFormItem>
        </DrawerForm>
    );
};

export default PutPasswordModal;
