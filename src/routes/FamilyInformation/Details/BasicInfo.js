import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
// import styles from './BasicInfo.less';
import {
  Card,
  Button,
  Form,
  Row,
  Col,
  Input,
  DatePicker,
  // Icon,
  // Divider,
  Select,
} from 'antd';
// import DescriptionList from '../../../components/DescriptionList';

const params = {
  familyId: 1000,
};
// const { Description } = DescriptionList;

const FormItem = Form.Item;
const { MonthPicker } = DatePicker;

@connect(({ familyinformation, loading }) => ({
  familyinformation,
  loading: loading.models.familyinformation,
}))
@Form.create()
export default class BasicInfo extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'familyinformation/fetch',
      payload: params,
    });
  }

  render() {
    const {
      form,
      // match,
      // routerData,
      familyinformation: { data },
      // loading,
    } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Fragment>
        <Card
          title="基本信息："
          style={{ marginBottom: 24 }}
          bordered={false}
          extra={
            <Button type="primary" icon="search">
              保存
            </Button>
          }
        >
          <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
            <Row gutter={24}>
              <Col span={8}>
                <FormItem label="家庭住址：">{data.address}</FormItem>
                <FormItem label="卫计信息：">
                  {getFieldDecorator('weiJiInformation', {
                    rules: [{ required: false, message: '请输入卫计信息!' }],
                    initialValue: data.weiJiInformation,
                  })(
                    <Select
                      style={{ width: 300 }}
                      placeholder="请输入卫计信息"
                      // onChange={handleChange}
                    >
                      <Select.Option key="0" value="双女户">
                        双女户
                      </Select.Option>
                      <Select.Option key="1" value="独生子女户">
                        独生子女户
                      </Select.Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem label="开户银行：">
                  {getFieldDecorator('bankOfDeposit', {
                    rules: [{ required: false, message: '请输入开户银行!' }],
                    initialValue: data.bankOfDeposit,
                  })(
                    <Select
                      style={{ width: 300 }}
                      placeholder="请输入开户银行"
                      // onChange={handleChange}
                    >
                      <Select.Option key="0" value="中国银行">
                        中国银行
                      </Select.Option>
                      <Select.Option key="1" value="农业银行">
                        农业银行
                      </Select.Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="所在组：">
                  {getFieldDecorator('groupName', {
                    rules: [{ required: false, message: '请输入所在组!' }],
                    initialValue: data.bankOfDeposit,
                  })(
                    <Select
                      placeholder="请输入所在组"
                      style={{ width: 300 }}
                      // onChange={handleChange}
                    >
                      <Select.Option key="0" value="无">
                        无
                      </Select.Option>
                      <Select.Option key="1" value="一组">
                        一组
                      </Select.Option>
                      <Select.Option key="2" value="二组">
                        二组
                      </Select.Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem label="识别标准：">
                  {getFieldDecorator('distinguishStandard', {
                    rules: [{ required: false, message: '请输入识别标准!' }],
                    initialValue: data.distinguishStandard,
                  })(
                    <Select
                      style={{ width: 300 }}
                      placeholder="请输入识别标准"
                      // onChange={handleChange}
                    >
                      <Select.Option key="0" value="国家标准">
                        国家标准
                      </Select.Option>
                      <Select.Option key="1" value="省定标准">
                        省定标准
                      </Select.Option>
                      <Select.Option key="1" value="市定标准">
                        市定标准
                      </Select.Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem label="银行卡号：">
                  {getFieldDecorator('bankCardNumber', {
                    rules: [{ required: false, message: '请输入银行卡号!' }],
                  })(<Input style={{ width: 300 }} placeholder="请输入银行卡号" />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="预脱贫时间：">
                  {getFieldDecorator('expectedShakeOffPovertyTime', {
                    rules: [{ required: false, message: '请输入所在组!' }],
                    initialValue: data.bankOfDeposit,
                  })(
                    <MonthPicker
                      // onChange={onChange}
                      style={{ width: 300 }}
                      placeholder="请输入预脱贫时间"
                    />
                  )}
                </FormItem>
                <FormItem label="是否军烈属：">
                  {getFieldDecorator('militaryGenusNote', {
                    rules: [{ required: false, message: '请输入是否军烈属!' }],
                    initialValue: data.militaryGenusNote,
                  })(
                    <Select
                      style={{ width: 300 }}
                      placeholder="请输入是否军烈属"
                      // onChange={handleChange}
                    >
                      <Select.Option key="0" value="是">
                        是
                      </Select.Option>
                      <Select.Option key="1" value="否">
                        否
                      </Select.Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem label="联系电话：">
                  {getFieldDecorator('contactPhone', {
                    rules: [{ required: false, message: '请输入联系电话!' }],
                  })(<Input style={{ width: 300 }} placeholder="请输入联系电话" />)}
                </FormItem>
              </Col>
            </Row>
            {/* <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit">Search</Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                  Clear
                </Button>
                <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                  Collapse <Icon type={this.state.expand ? 'up' : 'down'} />
                </a>
              </Col>
            </Row> */}
          </Form>
          {/* <Card type="inner">
            {data.memberList.map(item => (
              <Fragment>
                <DescriptionList size="small" style={{ marginBottom: 16 }} title={item.relationshipWithHouseholderNote}>
                  <Description term="姓名">{item.name}</Description>
                  <Description term="性别">{item.genderNote}</Description>
                  <Description term="年龄">{item.age}岁</Description>
                  <Description term="身份证号">{item.idCard}</Description>
                  <Description term="民族">{item.nationNote}</Description>
                  <Description term="健康状况">{item.healthNote}</Description>
                  <Description term="文化程度">{item.highestEducationNote}</Description>
                  <Description term="在校生状况">{item.studentSituation}</Description>
                  <Description term="劳动技能">{item.workSkill}</Description>
                </DescriptionList>
                <Divider style={{ margin: '16px 0' }} />
              </Fragment>
            ))}
          </Card> */}
        </Card>
      </Fragment>
    );
  }
}
