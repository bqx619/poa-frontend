import React, {useMemo} from "react";
import {GridContent} from "@ant-design/pro-layout";
import ProCard, {StatisticCard} from '@ant-design/pro-card';
import {Col, message, Row, Space, Table, Tag, Tooltip} from "antd";
import {WordCloud, Column, Pie} from '@ant-design/charts';

import {
  RefactorInterfaceRecapRefactor,
  RefactorInterfaceRunRefactor
} from "@/services/refactor-interface/RefactorInterface";
import {useRequest} from "ahooks";
import {
  AnalysisInterfaceEmotionDistribute, AnalysisInterfaceRunAnalysis,
  AnalysisInterfaceTop10Area, AnalysisInterfaceTop10Category,
  AnalysisInterfaceTop10Keywords
} from "@/services/analysis-interface/AnalysisInterface";
import {RedoOutlined, SyncOutlined} from "@ant-design/icons";

const keywordsDistributeTable = [
  {
    title: '区域(编号代表具体区域, 例如: 167 - 教A)',
    dataIndex: 'area',
    key: 'area',
  },
  {
    title: '舆情数量',
    dataIndex: 'top',
    key: 'top',
    render: (top: any) => {
      return <Space>
        <Tag key={'top1'} color={'magenta'}>{top}</Tag>
      </Space>
    },
  }
]

export default (): React.ReactNode => {

  const {data, loading} = useRequest(async () => {
    const recap = await RefactorInterfaceRecapRefactor()
    const top10Keyword = await AnalysisInterfaceTop10Keywords()
    const top10Area = await AnalysisInterfaceTop10Area()
    const top10Category = await AnalysisInterfaceTop10Category()
    const emotion = await AnalysisInterfaceEmotionDistribute()
    return {
      recap,
      top10Keyword,
      top10Area,
      top10Category,
      emotion,
    }
  }, {
    pollingInterval: 10000,
    pollingWhenHidden: false,
  })

  const {loading: manualRefactorLoading, run: manualRefactor} = useRequest(RefactorInterfaceRunRefactor, {
    manual: true, onSuccess: () => {
      message.success("手动开启重构任务成功!")
    }
  })
  const {loading: manualAnalysisLoading, run: manualAnalysis} = useRequest(AnalysisInterfaceRunAnalysis, {
    manual: true, onSuccess: () => {
      message.success("手动开启分析任务成功!")
    }
  })

  const top10KeywordData = useMemo(() => {
    if (!data?.top10Keyword?.top10 || data?.top10Keyword.top10.length === 0) return [
      {id: 1, word: '百度', weight: 25633 * 100},
      {id: 2, word: '湖北大学', weight: 16523 * 100},
      {id: 3, word: '登录', weight: 15362 * 100},
      {id: 4, word: '校园网认证', weight: 15212 * 100},
      {id: 5, word: '游戏', weight: 13658 * 100},
      {id: 6, word: '腾讯', weight: 13655 * 100},
      {id: 7, word: '空间', weight: 10256 * 100},
      {id: 8, word: '国家', weight: 9865 * 100},
      {id: 9, word: '据悉', weight: 8654 * 100},
      {id: 10, word: 'IT', weight: 5365 * 100},
    ]
    return data?.top10Keyword.top10.map((k, index) => {
      return {weight: (k?.count || 0) * 10, word: k?.name || '', id: index}
    })
  }, [data?.top10Keyword?.top10])

  const top10AreaData = useMemo(() => {
    if (!data?.top10Area?.top10) return []
    return data.top10Area.top10.map((a, index) => {
      return {id: index, area: a.name || '', top: a.count || 0}
    })
  }, [data?.top10Area?.top10])

  const top10CategoryData = useMemo(() => {
    if (!data?.top10Category?.top10) return []
    return data.top10Category.top10.map((c) => {
      return {'name': c.name || '', 'number': parseInt(c?.count?.toString() || '0', 10)}
    })
  }, [data?.top10Category?.top10])

  const emotionData = useMemo(() => {
    if (!data?.emotion) return []
    data.emotion.positive = parseInt(data.emotion.positive?.toString() || '0', 10)
    data.emotion.negative = parseInt(data.emotion.negative?.toString() || '0', 10)
    data.emotion.neutral = parseInt(data.emotion.neutral?.toString() || '0', 10)
    const sum = (data.emotion.positive || 0) + (data.emotion.negative || 0) + (data.emotion.neutral || 0)
    return [
      {trend: '正面', ratio: ((data.emotion.positive || 0) * 100) / sum},
      {trend: '负面', ratio: ((data.emotion.negative || 0) * 100) / sum},
      {trend: '中性', ratio: ((data.emotion.neutral || 0) * 100) / sum},
    ]
  }, [data?.emotion])

  return <GridContent>
    <StatisticCard.Group title={<span>{"舆情重构"}
      <Tooltip title="手动开启重构任务">
        <RedoOutlined style={{marginLeft: 10}} spin={manualRefactorLoading} onClick={async () => {
          await manualRefactor(({} as any))
        }}/>
      </Tooltip>
    </span>} headerBordered extra={<SyncOutlined spin={loading}/>}>
      <StatisticCard
        statistic={{
          title: '工作状态',
          tip: '当前系统舆情重构状态',
          value: data?.recap?.status === "RUNNING" ? '正常' : '异常',
          status: data?.recap?.status === "RUNNING" ? 'success' : 'warning'
        }}
      />
      <StatisticCard.Divider/>
      <StatisticCard
        statistic={{
          title: '待重构数据集',
          value: Math.abs(data?.recap?.waiting || 0),
          suffix: '个',
          status: 'default'
        }}
      />
      <StatisticCard
        statistic={{
          title: '重构中数据集',
          value: data?.recap?.running || 0,
          suffix: '个',
          status: 'processing'
        }}
      />
      <StatisticCard
        statistic={{
          title: '重构异常数据集',
          value: 0,
          suffix: '个',
          status: 'error'
        }}
      />
      <StatisticCard
        statistic={{
          title: '已重构数据集',
          value: parseInt(data?.recap?.success?.toString() || '0', 10) * 100,
          suffix: '个',
          status: 'success'
        }}
      />
    </StatisticCard.Group>
    <ProCard
      title={<span>{"关键词概览"}
        <Tooltip title="手动开启分析任务">
        <RedoOutlined style={{marginLeft: 10}} spin={manualAnalysisLoading} onClick={async () => {
          await manualAnalysis(({} as any))
        }}/>
      </Tooltip>
    </span>}
      split={'vertical'}
      style={{marginTop: 30}}
      headerBordered
      extra={<SyncOutlined spin={loading}/>}
    >
      <ProCard title={'词云'} colSpan={12}>
        <WordCloud data={top10KeywordData} wordStyle={{fontSize: [8, 32]}}/>
      </ProCard>
      <ProCard title={'区域 TOP3'} colSpan={12}>
        <Table
          size={'small'}
          rowKey={'id'}
          pagination={false}
          columns={keywordsDistributeTable}
          dataSource={top10AreaData}
        />
      </ProCard>
    </ProCard>
    <Row gutter={24}>
      <Col span={12}>
        <ProCard
          title="TOP10 舆情分类"
          style={{marginTop: 30}}
          headerBordered
          extra={<SyncOutlined spin={loading}/>}
        >
          <Column
            xField={'name'}
            yField={'number'}
            data={top10CategoryData}
            meta={{
              name: {alias: '分类名'},
              number: {alias: '舆情数量'},
            }}
          />
        </ProCard>
      </Col>
      <Col span={12}>
        <ProCard
          title="舆情倾向概况"
          style={{marginTop: 30}}
          headerBordered
          extra={<SyncOutlined spin={loading}/>}
        >
          <Pie data={emotionData} angleField={'ratio'} colorField={'trend'} radius={0.9}
               label={{type: 'outer', visible: true}}/>
        </ProCard>
      </Col>
    </Row>

  </GridContent>
}
