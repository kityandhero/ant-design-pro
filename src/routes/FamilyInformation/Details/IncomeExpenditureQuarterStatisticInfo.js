import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Form, Row, Col, Spin } from 'antd';

const FormItem = Form.Item;

@connect(({ incomeexpenditure, loading }) => ({
  incomeexpenditure,
  loading: loading.models.incomeexpenditure,
}))
@Form.create()
export class IncomeExpenditureQuarterStatisticInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataLoading: true,
      familyId: 0,
      year: 0,
      quarter: 0,
      data: {},
    };
  }

  componentDidMount() {
    const { year, familyId, quarter } = this.props;
    this.setState({ familyId });
    this.setState({ year });
    this.setState({ quarter });
    const { dispatch } = this.props;
    dispatch({
      type: 'incomeexpenditure/getquarterstatistic',
      payload: { familyId, year, quarter },
    }).then(() => {
      this.setState({ dataLoading: false });
      const {
        incomeexpenditure: { data },
      } = this.props;
      this.setState({ data });
    });
  }

  render() {
    const { dataLoading, year, quarter, data, familyId } = this.state;
    return (
      <Card
        title={`${year}年${quarter}季度收入情况${familyId}`}
        style={{ marginBottom: 24 }}
        bordered={false}
        extra={
          <Button type="primary" icon="edit" onClick={this.handleSaveMemberInfo}>
            修改
          </Button>
        }
      >
        <Spin spinning={dataLoading}>
          <Form className="ant-advanced-search-form">
            <Row gutter={24}>
              <Col span={6}>
                <FormItem label="劳务收入（元）">{data.workIncome}</FormItem>
                <FormItem label="亲友社会馈赠或捐献（元）">{data.giftIncome}</FormItem>
                <FormItem label="医疗支出（元）">{data.medicalCareExpenditure}</FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="生产经营性收入（元）">{data.productionIncome}</FormItem>
                <FormItem label="子女赡养费（元）">{data.supportIncome}</FormItem>
                <FormItem label="纯收入（元）">{data.netIncome}</FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="财产性收入（元）">{data.propertyIncome}</FormItem>
                <FormItem label="生产经营性支出（元）">{data.productionExpenditure}</FormItem>
                <FormItem label="人均纯收入（元）">{data.perCapitaIncome}</FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="各项补贴（元）">{data.subsidyIncome}</FormItem>
                <FormItem label="劳动技能">{data.workSkill}</FormItem>
                <FormItem label="教育支出（元）">{data.educationExpenditure}</FormItem>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Card>
    );
  }
}
