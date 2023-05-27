import { FC } from 'react';
import styles from '../style.less';
import { PrizeGrade as BasicListItemDataType } from '@/services/swagger/luckydraw';
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
      title={done ? null : `奖品级别${current ? '编辑' : '添加'}`}
      className={styles.standardListForm}
      width={375}
      onFinish={async (values: BasicListItemDataType) => {
        const ok = await onSubmit({ ...current, ...values });
        if(ok) onDone();
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
            message: '必填项',
          },
          {
            pattern: /^.{2,10}$/,
            message: '长度在2-10之间',
          },
        ]}
        placeholder="请输入级别名称"
        width="md"
        name="name"
        label='级别名称'
      />
      <ProFormSelect
        options={[{ label: "未中奖", value: 0 }, { label: "中奖", value: 1 }]}
        width="md"
        name="status"
        label="是否中奖"
      />
    </ModalForm>
  );
};

export default OperationModal;
