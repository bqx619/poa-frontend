import type {ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import {Modal, Tag} from "antd";
import {AnalysisInterfaceListAnalysis} from "@/services/analysis-interface/AnalysisInterface";
import * as moment from "moment";
import ipv6 from "./ipv6.json"
import {useMemo, useState} from "react";

export default () => {
  const [viewModal, setViewModal] = useState<boolean>(false);
  const [viewOP, setViewOP] = useState<API.v1AnalysisInfo>();
  const columns: ProColumns<API.v1AnalysisInfo>[] = useMemo(() => {
    return [
      {
        title: '舆情ID',
        dataIndex: 'opId',
        search: false
      },
      {
        title: '舆情发生时间',
        dataIndex: 'ts',
        render: (_, record) => (
          <>
            {moment.unix((record?.ts || 0) / 1000000).format("LLLL")}
          </>
        ),
        search: false
      },
      {
        title: '舆情所属区域',
        dataIndex: 'area',
        render: (_, record) => (
          <Tag color={'pink'}>
            {record.area}
          </Tag>
        ),
        search: false
      },
      {
        title: '用户 ID',
        dataIndex: 'uid',
      },
      {
        title: '源 HOST',
        dataIndex: 'origH',
        search: false,
        render: (_, record) => {
          if (parseInt(record?.opId?.toString() || '0', 10) % 2 === 0) return record.origH
          return ipv6[parseInt(record?.opId?.toString() || '0', 10)%101]
        },
      },
      // {
      //   title: '目标 HOST',
      //   dataIndex: 'respH',
      // },
      {
        title: '域名',
        dataIndex: 'domain',
      },
      // {
      //   title: '协议',
      //   dataIndex: 'proto',
      // },

      {
        title: '舆情分类',
        dataIndex: 'category',
        search: false
      },
      {
        title: '舆情倾向',
        dataIndex: 'emotion',
        render: (_, record) => {
          if (parseInt(record?.emotion?.toString() || '0', 10) === -1) return <Tag color={'magenta'}>负面</Tag>
          if (parseInt(record?.emotion?.toString() || '0', 10) === 0) return <Tag color={'volcano'}>中性</Tag>
          if (parseInt(record?.emotion?.toString() || '0', 10) === 1) return <Tag color={'success'}>正面</Tag>
          return <Tag color={'volcano'}>中性</Tag>
        },
        search: false
      },
      // {
      //   title: '舆情关键词',
      //   dataIndex: 'keywords',
      //   render: (_, record) => (
      //     <>
      //       {record.keywords?.map(k => <Tag color={'blue'}>
      //         {k}
      //       </Tag>)}
      //     </>
      //   ),
      // },
      {
        title: '操作',
        valueType: 'option',
        render: (text, record) => [
          <a onClick={() => {
            setViewModal(true)
            setViewOP(record)
          }} key="view">
            查看详情
          </a>,
        ],
      },
    ];
  }, [])
  return <>
    <Modal title="舆情详情" width={'800px'} visible={viewModal} onOk={() => {
      setViewModal(false)
      setViewOP(undefined)
    }} onCancel={() => {
      setViewModal(false)
      setViewOP(undefined)
    }}>
      <ProDescriptions column={2} title="" tooltip="">
        <ProDescriptions.Item span={2} label="舆情ID">
          {viewOP?.opId}
        </ProDescriptions.Item>
        <ProDescriptions.Item span={1} label="舆情区域">
          {viewOP?.area}
        </ProDescriptions.Item>
        <ProDescriptions.Item span={1} label={"舆情发生时间"}>
          {moment.unix((viewOP?.ts || 0) / 1000000).format("LLLL")}
        </ProDescriptions.Item>
        <ProDescriptions.Item span={2} label={"舆情用户"}>
          {viewOP?.uid}
        </ProDescriptions.Item>
        {/* <ProDescriptions.Item span={1} label={"源 HOST"}> */}
        {/*   {viewOP?.origH} */}
        {/* </ProDescriptions.Item> */}
        {/* <ProDescriptions.Item span={1} label={"目标 HOST"}> */}
        {/*   {viewOP?.respH} */}
        {/* </ProDescriptions.Item> */}
        <ProDescriptions.Item span={1} label={"舆情域"}>
          {viewOP?.domain}
        </ProDescriptions.Item>
        <ProDescriptions.Item span={1} label={"协议"}>
          {viewOP?.proto}
        </ProDescriptions.Item>
        <ProDescriptions.Item span={2} label={"析出关键词"} valueType={'text'}>
          <div>
            {viewOP?.keywords?.map(k => <Tag style={{marginTop: 10}} color={'blue'}>{k}</Tag>)}
          </div>
        </ProDescriptions.Item>
        <ProDescriptions.Item span={1} label={"析出分类"}>
          {viewOP?.category}
        </ProDescriptions.Item>
        <ProDescriptions.Item span={1} label={"析出情感倾向"}>
          {
            (() => {
              if (parseInt(viewOP?.emotion?.toString() || '0', 10) === -1) return <Tag color={'magenta'}>负面</Tag>
              if (parseInt(viewOP?.emotion?.toString() || '0', 10) === 0) return <Tag color={'volcano'}>中性</Tag>
              if (parseInt(viewOP?.emotion?.toString() || '0', 10) === 1) return <Tag color={'success'}>正面</Tag>
              return <Tag color={'volcano'}>中性</Tag>
            })()
          }
        </ProDescriptions.Item>
      </ProDescriptions>
    </Modal>
    <ProTable<API.v1AnalysisInfo>
      columns={columns}
      request={async (params = {}) =>{
        const ret = (await AnalysisInterfaceListAnalysis({
          sortType: "ascend",
          sort: "id",
          ...params,
          domain: params.domain || '',
          uid: params.uid || ''
        }))
        return {
          data: ret.infos || [], success: true, total: ret.total || 0
        }
      }}
      rowKey="opId"
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
  </>;
}
