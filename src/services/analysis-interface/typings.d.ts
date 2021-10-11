// @ts-ignore
/* eslint-disable */

declare namespace API {
  type v1AnalysisInfo = {
    ts?: number;
    uid?: string;
    origH?: string;
    respH?: string;
    domain?: string;
    proto?: string;
    area?: string;
    keywords?: string[];
    category?: string;
    emotion?: number;
    opId?: number;
  };

  type v1EmotionDistributeReply = {
    positive?: number;
    neutral?: number;
    negative?: number;
  };

  type v1EmotionNoticeReply = {
    status?: string;
    msg?: string;
  };

  type v1GetAnalysisReply = {
    info?: v1AnalysisInfo;
  };

  type v1ListAnalysisReply = {
    infos?: v1AnalysisInfo[];
    total?: number;
  };

  type v1RunAnalysisReply = true;

  type v1RunAnalysisRequest = true;

  type v1Top10 = {
    name?: string;
    count?: number;
  };

  type v1Top10Reply = {
    top10?: v1Top10[];
  };
}
