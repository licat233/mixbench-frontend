import type { FC } from 'react';
import styles from '../style.less';
import { Project as BasicListItemDataType } from '@/services/swagger/luckydraw';
import { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-components';

type OperationModalProps = {
  done: boolean;
  visible: boolean;
  current: Partial<BasicListItemDataType> | undefined;
  onDone: () => void;
  onSubmit: (values: BasicListItemDataType) => Promise<boolean>;
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const { done, visible, current, onDone, onSubmit } = props;
  if (!visible) {
    return null;
  }
  return (
    <ModalForm<BasicListItemDataType>
      open={visible}
      title={done ? null : `项目${current ? '编辑' : '添加'}`}
      className={styles.standardListForm}
      width={375}
      onFinish={async (values) => {
        const ok = await onSubmit({ ...current, ...values });
        if (ok) onDone();
      }}
      initialValues={current}
      submitter={{
        render: (_, dom) => (done ? null : dom),
      }}
      // trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
        bodyStyle: done ? { padding: '72px 0' } : {},
      }}
    >
      <ProFormText
        rules={[
          {
            required: true,
            message: '项目名称为必填项',
          },
        ]}
        placeholder="请输入项目名称"
        width="md"
        name="name"
        label="项目名称"
      />
      <ProFormSelect
        placeholder="请选择项目状态"
        options={[{ label: "关闭", value: 0 }, { label: "开启", value: 1 }]}
        width="md"
        name="status"
        label='项目状态'
      />
    </ModalForm>
  );
};

export default OperationModal;
