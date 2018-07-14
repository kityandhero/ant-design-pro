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
  Spin,
  // Icon,
  // Divider,
  Select,
} from 'antd';

const FormItem = Form.Item;
const { MonthPicker } = DatePicker;

@connect(({ familyinformation, loading }) => ({
  familyinformation,
  loading: loading.models.familyinformation,
}))
@Form.create()
export default class BasicInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      errorLogId: 0,
      savingBasicInfo: false,
      savingProductionAndLife: false,
    };
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;
    const { errorLogId } = params;
    this.setState({ errorLogId });
    this.setState({ savingBasicInfo: true });
    this.setState({ savingProductionAndLife: true });
    dispatch({
      type: 'familyinformation/fetch',
      payload: { errorLogId },
    }).then(() => {
      this.setState({ savingBasicInfo: false });
      this.setState({ savingProductionAndLife: false });
    });
  }

  handleSaveBasicInfo = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { errorLogId } = this.state;
    form.validateFields((err, values) => {
      if (!err) {
        this.setState({ savingBasicInfo: true });
        const submitValue = values;
        submitValue.errorLogId = errorLogId;
        submitValue.expectedShakeOffPovertyTime = values.expectedShakeOffPovertyTime.format(
          'YYYY-MM'
        );
        dispatch({
          type: 'familyinformation/savebasicinfo',
          payload: submitValue,
        }).then(() => {
          this.setState({ savingBasicInfo: false });
        });
      }
    });
  };

  handleSaveProductionAndLife = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { errorLogId } = this.state;
    form.validateFields((err, values) => {
      if (!err) {
        this.setState({ savingProductionAndLife: true });
        const submitValue = values;
        submitValue.errorLogId = errorLogId;
        dispatch({
          type: 'familyinformation/saveproductionandlife',
          payload: submitValue,
        }).then(() => {
          this.setState({ savingProductionAndLife: false });
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
    const { savingBasicInfo } = this.state;
    const { savingProductionAndLife } = this.state;
    return (
      <Fragment>
        <Card
          title="基本信息"
          style={{ marginBottom: 24 }}
          bordered={false}
          extra={
            <Button type="primary" icon="save" onClick={this.handleSaveBasicInfo}>
              保存
            </Button>
          }
        >
          <Spin spinning={savingBasicInfo}>
            <Form className="ant-advanced-search-form">
              <Row gutter={24}>
                <Col span={8}>
                  <FormItem label="家庭住址">{data.address}</FormItem>
                  <FormItem label="卫计信息">
                    {getFieldDecorator('weiJiInformation', {
                      rules: [{ required: false, message: '请选择卫计信息!' }],
                      initialValue: data.weiJiInformation,
                    })(
                      <Select
                        placeholder="请选择卫计信息"
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
                  <FormItem label="开户银行">
                    {getFieldDecorator('bankOfDeposit', {
                      rules: [{ required: false, message: '请选择开户银行!' }],
                      initialValue: data.bankOfDeposit,
                    })(
                      <Select
                        placeholder="请选择开户银行"
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
                  <FormItem label="所在组">
                    {getFieldDecorator('groupName', {
                      rules: [{ required: false, message: '请选择所在组!' }],
                      initialValue: data.groupName,
                    })(
                      <Select
                        placeholder="请选择所在组"
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
                  <FormItem label="识别标准">
                    {getFieldDecorator('distinguishStandard', {
                      rules: [{ required: false, message: '请选择识别标准!' }],
                      initialValue: data.distinguishStandard,
                    })(
                      <Select
                        placeholder="请选择识别标准"
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
                  <FormItem label="银行卡号">
                    {getFieldDecorator('bankCardNumber', {
                      rules: [{ required: false, message: '请输入银行卡号!' }],
                      initialValue: data.bankCardNumber,
                    })(<Input span={8} placeholder="请输入银行卡号" />)}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem label="预脱贫时间">
                    {getFieldDecorator('expectedShakeOffPovertyTime', {
                      rules: [{ required: false, message: '请输入所在组!' }],
                      initialValue: moment(data.expectedShakeOffPovertyTime, 'YYYY-MM'),
                    })(
                      <MonthPicker
                        // onChange={onChange}
                        style={{ width: '100%' }}
                        format="YYYY-MM"
                        placeholder="请输入预脱贫时间"
                      />
                    )}
                  </FormItem>
                  <FormItem label="是否军烈属">
                    {getFieldDecorator('militaryGenusNote', {
                      rules: [{ required: false, message: '请选择是否军烈属!' }],
                      initialValue: data.militaryGenusNote,
                    })(
                      <Select
                        placeholder="请选择是否军烈属"
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
                  <FormItem label="联系电话">
                    {getFieldDecorator('contactPhone', {
                      rules: [{ required: false, message: '请输入联系电话!' }],
                      initialValue: data.contactPhone,
                    })(<Input span={8} placeholder="请输入联系电话" />)}
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>
        <Card
          title="生产生活条件"
          style={{ marginBottom: 24 }}
          bordered={false}
          extra={
            <Button type="primary" icon="save" onClick={this.handleSaveProductionAndLife}>
              保存
            </Button>
          }
        >
          <Spin spinning={savingProductionAndLife}>
            <Form className="ant-advanced-search-form">
              <Row gutter={24}>
                <Col span={8}>
                  <FormItem label="危房户">{data.dangerous}</FormItem>
                  <FormItem label="耕地面积(亩)">
                    {getFieldDecorator('cultivatedLand', {
                      rules: [{ required: false, message: '请输入耕地面积(亩)!' }],
                      initialValue: data.cultivatedLand,
                    })(
                      <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        placeholder="请输入耕地面积(亩)"
                      />
                    )}
                  </FormItem>
                  <FormItem label="退耕还林面积(亩)">
                    {getFieldDecorator('tuiGengHuanLinArea', {
                      rules: [{ required: false, message: '请输入退耕还林面积(亩)!' }],
                      initialValue: data.tuiGengHuanLinArea,
                    })(
                      <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        placeholder="请输入退耕还林面积(亩)"
                      />
                    )}
                  </FormItem>
                  <FormItem label="水面面积(亩)">
                    {getFieldDecorator('waterSurfaceArea', {
                      rules: [{ required: false, message: '请输入水面面积(亩)!' }],
                      initialValue: data.waterSurfaceArea,
                    })(
                      <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        placeholder="请输入水面面积(亩)"
                      />
                    )}
                  </FormItem>
                  <FormItem label="与村主干路距离(公里)">
                    {getFieldDecorator('distanceFromMainRoad', {
                      rules: [{ required: false, message: '请输入与村主干路距离(公里)!' }],
                      initialValue: data.distanceFromMainRoad,
                    })(
                      <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        placeholder="请输入与村主干路距离(公里)"
                      />
                    )}
                  </FormItem>
                  <FormItem label="住房面积(平方米)">
                    {getFieldDecorator('householdArea', {
                      rules: [{ required: false, message: '请输入住房面积(平方米)!' }],
                      initialValue: data.householdArea,
                    })(
                      <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        placeholder="请输入住房面积(平方米)"
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem label="饮水是否困难">{data.difficultyInDrinkingWater}</FormItem>
                  <FormItem label="有效灌溉面积(亩)">
                    {getFieldDecorator('irrigatedArea', {
                      rules: [{ required: false, message: '请输入有效灌溉面积(亩)!' }],
                      initialValue: data.irrigatedArea,
                    })(
                      <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        placeholder="请输入有效灌溉面积(亩))"
                      />
                    )}
                  </FormItem>
                  <FormItem label="林果面积(亩)">
                    {getFieldDecorator('linGuoArea', {
                      rules: [{ required: false, message: '请输入林果面积(亩)!' }],
                      initialValue: data.linGuoArea,
                    })(
                      <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        placeholder="请输入林果面积(亩)"
                      />
                    )}
                  </FormItem>
                  <FormItem label="是否通生产用电">
                    {getFieldDecorator('productionElectric', {
                      rules: [{ required: false, message: '请输入是否通生产用电!' }],
                      initialValue: data.productionElectric,
                    })(
                      <Select
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
                  <FormItem label="入户路类型">
                    {getFieldDecorator('entryRoadType', {
                      rules: [{ required: false, message: '请选择入户路类型!' }],
                      initialValue: data.entryRoadType,
                    })(
                      <Select
                        placeholder="请选择入户路类型"
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
                  <FormItem label="主要燃料类型">
                    {getFieldDecorator('fuelType', {
                      rules: [{ required: false, message: '请选择主要燃料类型!' }],
                      initialValue: data.fuelType,
                    })(
                      <Select
                        placeholder="请选择主要燃料类型"
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
                  <FormItem label="饮水是否安全">{data.difficultyInDrinkingWater}</FormItem>
                  <FormItem label="林地面积(亩)">
                    {getFieldDecorator('woodland', {
                      rules: [{ required: false, message: '请输入林地面积(亩)!' }],
                      initialValue: data.woodland,
                    })(
                      <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        placeholder="请输入林地面积(亩)"
                      />
                    )}
                  </FormItem>
                  <FormItem label="牧草地面积(亩)">
                    {getFieldDecorator('muCaoDiArea', {
                      rules: [{ required: false, message: '请输入牧草地面积(亩)!' }],
                      initialValue: data.muCaoDiArea,
                    })(
                      <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        placeholder="请输入牧草地面积(亩)"
                      />
                    )}
                  </FormItem>
                  <FormItem label="是否加入农民合作社">
                    {getFieldDecorator('isJoinCooperative', {
                      rules: [{ required: false, message: '请选择是否加入农民合作社!' }],
                      initialValue: data.isJoinCooperative,
                    })(
                      <Select
                        placeholder="请选择是否加入农民合作社"
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
                  <FormItem label="是否通生活用电">
                    {getFieldDecorator('lifeElectric', {
                      rules: [{ required: false, message: '请选择是否通生活用电!' }],
                      initialValue: data.lifeElectric,
                    })(
                      <Select
                        placeholder="请选择是否通生活用电"
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
                  <FormItem label="有无卫生厕所">
                    {getFieldDecorator('hasSanitaryToilet', {
                      rules: [{ required: false, message: '请选择有无卫生厕所!' }],
                      initialValue: data.hasSanitaryToilet,
                    })(
                      <Select
                        placeholder="请选择有无卫生厕所"
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
          </Spin>
        </Card>
      </Fragment>
    );
  }
}
