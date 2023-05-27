/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useState } from 'react';
import styles from './style.less';
import { PutCurrentReq, uploadAvatar } from '@/services/swagger/admin';
import Upload, { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload';
import { message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DrawerForm, ProFormItem, ProFormText } from '@ant-design/pro-components';

type OperationModalProps = {
  done: boolean;
  open: boolean;
  current: API.CurrentUser;
  onDone: () => void;
  onSubmit: (values: PutCurrentReq) => Promise<boolean>;
};

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const { done, open: visible, current, onDone, onSubmit } = props;
  if (!visible) {
    return null;
  }

  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>(current?.avatar || "");
  const [filectx, setFilectx] = useState<string | RcFile | Blob>("");

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    const isLoad = info.file.status === 'uploading';
    setLoading(isLoad);
    if (isLoad) {
      // Get this url from response in real world.
      const rcfile = info.file.originFileObj as RcFile;
      getBase64(rcfile, url => {
        setLoading(false);
        setAvatarUrl(url);
      });
    }
  };

  const customRequest = async (file: string | RcFile | Blob) => {
    setFilectx(file);
  }

  const handleUpload = async (req: PutCurrentReq): Promise<boolean> => {
    // const file = options.file
    const file = filectx;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const resp = await uploadAvatar({
        type: "options",
        data: formData,
        requestType: 'form',
      })
      if (resp.success) {
        const url = resp.data as string || ""
        setAvatarUrl(url)
        req.avatar = url
        return true
      }
      throw new Error(resp.errorMessage || "上传失败")
    } catch (error: any) {
      message.error(error.message)
      // setAvatarUrl("")
    }
    return false
  }

  const customOnSubmit = async (req: PutCurrentReq): Promise<boolean> => {
    const ok = await handleUpload(req);
    if (ok) {
      if (req.avatar.length > 250) {
        message.error("头像的名字长度过长")
        return false
      }
      return onSubmit(req)
    }
    return false
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );


  return (
    <DrawerForm<PutCurrentReq>
      open={visible}
      title={done ? null : `管理员${current ? '编辑' : '添加'}`}
      className={styles.standardListForm}
      width={375}
      onFinish={async (values) => {
        const req: PutCurrentReq = {
          name: values.name,
          avatar: avatarUrl,
          passport: values.passport,
          email: values.email
        }
        const ok = await customOnSubmit(req);
        if (ok) onDone();
      }}
      initialValues={current}
      submitter={{
        render: (_, dom) => (done ? null : dom),
      }}
      // trigger={<>{children}</>}
      drawerProps={{
        onClose: () => onDone(),
        // onCancel: () => onDone(),
        destroyOnClose: true,
        bodyStyle: done ? { padding: '72px 0' } : {},
      }}
    >
      <ProFormItem label="头像" name="avatar" valueType="image"
        rules={[
          {
            required: true,
            message: '必填项',
          },
        ]}>
        <Upload
          accept='.jpg,.png,.jpeg'
          name="avatar"
          listType="picture-card"
          showUploadList={false}
          action="/v1/api/admin/uploadAvatar"
          beforeUpload={beforeUpload}
          onChange={handleChange}
          customRequest={(options)=>customRequest(options.file)}
          fileList={[]}
          maxCount={1}
        >
          {avatarUrl ? <img src={avatarUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      </ProFormItem>

      <ProFormText
        rules={[
          {
            required: true,
            message: '管理员名称为必填项',
          },
          {
            pattern: /^.{2,10}$/,
            message: '长度在2-10之间',
          },
        ]}
        placeholder="请输入管理员名称"
        width="md"
        name="name"
        label="管理员名称"
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: '账号为必填项',
          },
          {
            pattern: /^[A-Za-z0-9]{3,20}$/,
            message: '用户名由3-20位数字或者字母组成',
          },
        ]}
        placeholder="请输入账号"
        width="md"
        name="passport"
        label="账号"
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: '邮箱为必填项',
          },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: '不合法的邮箱地址！',
          },
        ]}
        placeholder="请输入邮箱"
        width="md"
        name="email"
        label="邮箱"
      />
    </DrawerForm>
  );
};

export default OperationModal;
