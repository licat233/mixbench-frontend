/*
 * @Author: licat
 * @Date: 2022-12-29 16:18:44
 * @LastEditors: licat
 * @LastEditTime: 2022-12-29 16:40:15
 * @Description: 
 */
import { DeleteTwoTone, DownOutlined, EditTwoTone } from "@ant-design/icons";
import { Dropdown } from "antd";

const operationList = [
    {
        key: 'edit',
        itemIcon: <EditTwoTone twoToneColor='#245cfc' />,
        label: '编辑'
    },
    {
        key: 'delete',
        itemIcon: <DeleteTwoTone twoToneColor='#ce2e3f' />,
        danger: true,
        label: '删除',
    },
]

type MoreBtnProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onEdit: (current: any) => void;
    onDel: (current_id: number) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    current: any;
}

const MoreActionBtn: React.FC<MoreBtnProps> = (props) => {
    const { onEdit, onDel, current } = props;

    const editAndDelete = (key: string | number, currentItem: any) => {
        if (key === 'edit') {
            onEdit(currentItem);
        }
        else if (key === 'delete') {
            onDel(currentItem.id)
        }
    };

    return (
        <Dropdown
        menu={{
            selectedKeys: [],
            onClick: ({ key }) => editAndDelete(key, current),
            items: operationList,
          }}
        >
            <a href="#!" onClick={(e) => { e.preventDefault() }}>
                操作 <DownOutlined />
            </a>
        </Dropdown>
    );
}

export default MoreActionBtn;