import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
// import styles from './BasicInfo.less';
import {
  Card,
  Button,
  Form,
  Row,
  Col,
  Input,
  InputNumber,
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

  handleSaveBasicInfo = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const submitValue = values;
        submitValue.familyId = params.familyId;
        submitValue.expectedShakeOffPovertyTime = values.expectedShakeOffPovertyTime.format(
          'YYYY-MM'
        );
        dispatch({
          type: 'familyinformation/savebasicinfo',
          payload: submitValue,
        });
      }
    });
  };

  handleSaveProductionAndLife = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const submitValue = values;
        submitValue.familyId = params.familyId;
        dispatch({
          type: 'familyinformation/saveproductionandlife',
          payload: submitValue,
        });
      }
    });
  };

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
            <Button type="primary" icon="search" onClick={this.handleSaveBasicInfo}>
              保存
            </Button>
          }
        >
          <Form className="ant-advanced-search-form">
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
                    initialValue: data.groupName,
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
                    initialValue: data.bankCardNumber,
                  })(<Input style={{ width: 300 }} placeholder="请输入银行卡号" />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="预脱贫时间：">
                  {getFieldDecorator('expectedShakeOffPovertyTime', {
                    rules: [{ required: false, message: '请输入所在组!' }],
                    initialValue: moment(data.expectedShakeOffPovertyTime, 'YYYY-MM'),
                  })(
                    <MonthPicker
                      // onChange={onChange}
                      style={{ width: 300 }}
                      format="YYYY-MM"
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
                    initialValue: data.contactPhone,
                  })(<Input style={{ width: 300 }} placeholder="请输入联系电话" />)}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card
          title="生产生活条件："
          style={{ marginBottom: 24 }}
          bordered={false}
          extra={
            <Button type="primary" icon="search" onClick={this.handleSaveProductionAndLife}>
              保存
            </Button>
          }
        >
          <Form className="ant-advanced-search-form">
            <Row gutter={24}>
              <Col span={8}>
                <FormItem label="危房户：">{data.dangerous}</FormItem>
                <FormItem label="耕地面积(亩)：">
                  {getFieldDecorator('cultivatedLand', {
                    rules: [{ required: false, message: '请输入耕地面积(亩)!' }],
                    initialValue: data.cultivatedLand,
                  })(
                    <InputNumber style={{ width: 300 }} min={0} placeholder="请输入耕地面积(亩)" />
                  )}
                </FormItem>
                <FormItem label="退耕还林面积(亩)：">
                  {getFieldDecorator('tuiGengHuanLinArea', {
                    rules: [{ required: false, message: '请输入退耕还林面积(亩)!' }],
                    initialValue: data.tuiGengHuanLinArea,
                  })(
                    <InputNumber
                      style={{ width: 300 }}
                      min={0}
                      placeholder="请输入退耕还林面积(亩)"
                    />
                  )}
                </FormItem>
                <FormItem label="水面面积(亩)：">
                  {getFieldDecorator('waterSurfaceArea', {
                    rules: [{ required: false, message: '请输入水面面积(亩)!' }],
                    initialValue: data.waterSurfaceArea,
                  })(
                    <InputNumber style={{ width: 300 }} min={0} placeholder="请输入水面面积(亩)" />
                  )}
                </FormItem>
                <FormItem label="与村主干路距离(公里)：">
                  {getFieldDecorator('distanceFromMainRoad', {
                    rules: [{ required: false, message: '请输入与村主干路距离(公里)!' }],
                    initialValue: data.distanceFromMainRoad,
                  })(
                    <InputNumber
                      style={{ width: 300 }}
                      min={0}
                      placeholder="请输入与村主干路距离(公里)"
                    />
                  )}
                </FormItem>
                <FormItem label="住房面积(平方米)：">
                  {getFieldDecorator('householdArea', {
                    rules: [{ required: false, message: '请输入住房面积(平方米)!' }],
                    initialValue: data.householdArea,
                  })(
                    <InputNumber
                      style={{ width: 300 }}
                      min={0}
                      placeholder="请输入住房面积(平方米)"
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="饮水是否困难：">{data.difficultyInDrinkingWater}</FormItem>
                <FormItem label="有效灌溉面积(亩)：">
                  {getFieldDecorator('irrigatedArea', {
                    rules: [{ required: false, message: '请输入有效灌溉面积(亩)!' }],
                    initialValue: data.irrigatedArea,
                  })(
                    <InputNumber
                      style={{ width: 300 }}
                      min={0}
                      placeholder="请输入有效灌溉面积(亩))"
                    />
                  )}
                </FormItem>
                <FormItem label="林果面积(亩)：">
                  {getFieldDecorator('linGuoArea', {
                    rules: [{ required: false, message: '请输入林果面积(亩)!' }],
                    initialValue: data.linGuoArea,
                  })(
                    <InputNumber style={{ width: 300 }} min={0} placeholder="请输入林果面积(亩)" />
                  )}
                </FormItem>
                <FormItem label="是否通生产用电：">
                  {getFieldDecorator('productionElectric', {
                    rules: [{ required: false, message: '请输入是否通生产用电!' }],
                    initialValue: data.productionElectric,
                  })(
                    <Select
                      style={{ width: 300 }}
                      placeholder="请输入是否通生产用电"
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
                <FormItem label="入户路类型：">
                  {getFieldDecorator('entryRoadType', {
                    rules: [{ required: false, message: '请输入入户路类型!' }],
                    initialValue: data.entryRoadType,
                  })(
                    <Select
                      style={{ width: 300 }}
                      placeholder="请输入入户路类型"
                      // onChange={handleChange}
                    >
                      <Select.Option key="0" value="公路">
                        公路
                      </Select.Option>
                      <Select.Option key="1" value="土路">
                        土路
                      </Select.Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem label="主要燃料类型：">
                  {getFieldDecorator('fuelType', {
                    rules: [{ required: false, message: '请输入主要燃料类型!' }],
                    initialValue: data.fuelType,
                  })(
                    <Select
                      style={{ width: 300 }}
                      placeholder="请输入主要燃料类型"
                      // onChange={handleChange}
                    >
                      <Select.Option key="0" value="煤">
                        煤
                      </Select.Option>
                      <Select.Option key="1" value="木材">
                        木材
                      </Select.Option>
                      <Select.Option key="2" value="天然气">
                        天然气
                      </Select.Option>
                      <Select.Option key="3" value="电">
                        电
                      </Select.Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="饮水是否安全：">{data.difficultyInDrinkingWater}</FormItem>
                <FormItem label="林地面积(亩)：">
                  {getFieldDecorator('woodland', {
                    rules: [{ required: false, message: '请输入林地面积(亩)!' }],
                    initialValue: data.woodland,
                  })(
                    <InputNumber style={{ width: 300 }} min={0} placeholder="请输入林地面积(亩)" />
                  )}
                </FormItem>
                <FormItem label="牧草地面积(亩)：">
                  {getFieldDecorator('muCaoDiArea', {
                    rules: [{ required: false, message: '请输入牧草地面积(亩)!' }],
                    initialValue: data.muCaoDiArea,
                  })(
                    <InputNumber
                      style={{ width: 300 }}
                      min={0}
                      placeholder="请输入牧草地面积(亩)"
                    />
                  )}
                </FormItem>
                <FormItem label="是否加入农民合作社：">
                  {getFieldDecorator('isJoinCooperative', {
                    rules: [{ required: false, message: '请输入是否加入农民合作社!' }],
                    initialValue: data.isJoinCooperative,
                  })(
                    <Select
                      style={{ width: 300 }}
                      placeholder="请输入是否加入农民合作社"
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
                <FormItem label="是否通生活用电：">
                  {getFieldDecorator('lifeElectric', {
                    rules: [{ required: false, message: '请输入是否通生活用电!' }],
                    initialValue: data.lifeElectric,
                  })(
                    <Select
                      style={{ width: 300 }}
                      placeholder="请输入是否通生活用电"
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
                <FormItem label="有无卫生厕所：">
                  {getFieldDecorator('hasSanitaryToilet', {
                    rules: [{ required: false, message: '请输入有无卫生厕所!' }],
                    initialValue: data.hasSanitaryToilet,
                  })(
                    <Select
                      style={{ width: 300 }}
                      placeholder="请输入有无卫生厕所"
                      // onChange={handleChange}
                    >
                      <Select.Option key="0" value="有">
                        有
                      </Select.Option>
                      <Select.Option key="1" value="无">
                        无
                      </Select.Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
      </Fragment>
    );
  }
}
