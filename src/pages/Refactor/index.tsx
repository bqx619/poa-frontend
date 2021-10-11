import type {ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import * as moment from 'moment';
import {Tag} from "antd";
import {RefactorInterfaceListRefactor} from "@/services/refactor-interface/RefactorInterface";

const columns: ProColumns<API.v1RefactorRefactorInfo>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 48,
  },
  {
    title: '数据目录',
    dataIndex: 'dir',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '数据日期',
    dataIndex: 'day',
    width: '15%',
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => (
      <>
        {moment.unix((record?.day || 0) / 1000000).format("LL")}
      </>
    ),
    search: false
  },
  {
    title: '数据时段',
    key: 'hours',
    width: '15%',
    search: false,
    render: (_, record) => (
      <Tag color={'success'}>
        {record.beginHour} - {record.endHour}
      </Tag>
    ),
  },
];

export default () => {
  return (
    <ProTable<API.v1RefactorRefactorInfo>
      columns={columns}
      request={async (params = {}) =>{
        const ret = (await RefactorInterfaceListRefactor({
          sortType: "ascend",
          sort: "id",
          ...params,
          id: params.id || 0,
          dir: params.dir || ''
        }))
        return {
          data: ret.infos || [], success: true, total: ret.total || 0
        }
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      form={{
        ignoreRules: false,
      }}
      pagination={{
        pageSize: 10,
      }}
      dateFormatter="string"
      headerTitle="舆情源数据"
    />
  );
}
