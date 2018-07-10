import React, { PureComponent } from 'react';
// import moment from 'moment';
// import { connect } from 'dva';
// import styles from './BasicInfo.less';
import {
  Card,
  Button,
  Form,
  Row,
  Col,
  Input,
  // InputNumber,
  // DatePicker,
  Spin,
  // Icon,
  // Divider,
  Select,
} from 'antd';

const FormItem = Form.Item;
// const { MonthPicker } = DatePicker;

@Form.create()
export class MemberItem extends PureComponent {
  constructor(props) {
    super(props);
    // console.dir(props);
    const { memberData } = this.props;
    // let savingSet = new Map();
    // console.dir(savingSet);
    // savingSet.set(memberData.personnelId, false);
    this.state = {
      workInfo: memberData.workInfo,
      studentSituation: memberData.studentSituation,
      // key: memberData.personnelId,
      saving: false,
    };
  }

  // checkSaving = () => {
  // 	const {
  // 		memberData,
  // 	} = this.props;
  // 	console.dir(this.state);
  // };

  handleSaveMemberInfo = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        // var savingKey = `savingMember${values.personnelId}`;
        this.setState({ saving: true });
        const submitValue = values;
        // console.dir(submitValue);
        dispatch({
          type: 'familyinformation/savememberinfo',
          payload: submitValue,
        }).then(() => {
          this.setState({ saving: false });
          this.setState({ workInfo: submitValue.workInfo });
          this.setState({ studentSituation: submitValue.studentSituation });
        });
      }
    });
  };

  handleChangeStudentSituation = value => {
    this.setState({ studentSituation: value });
  };

  handleChangeWorkInfo = value => {
    this.setState({ workInfo: value });
  };

  render() {
    const { form, memberData, dataLoading } = this.props;
    const { saving, workInfo, studentSituation } = this.state;
    const { getFieldDecorator } = form;
    // console.dir(getFieldDecorator);
    return (
      <Card
        title={`[${memberData.relationshipWithHouseholderNote}] ${memberData.name} ${
          memberData.age
        }岁 ${memberData.healthNote}`}
        style={{ marginBottom: 24 }}
        bordered={false}
        extra={
          <Button type="primary" icon="save" onClick={this.handleSaveMemberInfo}>
            保存
          </Button>
        }
      >
        <Spin spinning={dataLoading || saving}>
          <Form className="ant-advanced-search-form">
            <FormItem>
              {getFieldDecorator('personnelId', {
                rules: [{ required: true, message: '请选择参加城乡居民基本医疗保险!' }],
                initialValue: memberData.personnelId,
              })(<Input type="hidden" />)}
            </FormItem>
            <Row gutter={24}>
              <Col span={4}>
                <FormItem label="人编号">{memberData.personnelId}</FormItem>
                <FormItem label="文化程度">{memberData.highestEducationNote}</FormItem>
                <FormItem label="残疾人生活补贴">{memberData.disabilityLiveSubsidyNote}</FormItem>
              </Col>
              <Col span={4}>
                <FormItem label="姓名">{memberData.name}</FormItem>
                <FormItem label="参加大病医疗">{memberData.joinMedicalInsuranceNote}</FormItem>
                <FormItem label="残疾人护理补贴">{memberData.disabilityCareSubsidyNote}</FormItem>
              </Col>
              <Col span={4}>
                <FormItem label="性别">{memberData.sex}</FormItem>
                <FormItem label="健康状况">{memberData.healthNote}</FormItem>
                <FormItem label="老人补贴">{memberData.elderlySubsidyNote}</FormItem>
              </Col>
              <Col span={4}>
                <FormItem label="身份证号">{memberData.idCard}</FormItem>
                <FormItem label="劳动技能">{memberData.workSkill}</FormItem>
                <FormItem label="独生子女或双女户补贴">{memberData.oneChildSubsidyNote}</FormItem>
              </Col>
              <Col span={4}>
                <FormItem label="与户主关系">{memberData.relationshipWithHouseholderNote}</FormItem>
                <FormItem label="低保">{memberData.subsistenceAllowancesTypeNote}</FormItem>
              </Col>
              <Col span={4}>
                <FormItem label="民族">{memberData.nationNote}</FormItem>
                <FormItem label="五保">{memberData.fiveInsuranceNote}</FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem label="参加城乡居民基本医疗保险">
                  {getFieldDecorator('attendMedicare', {
                    rules: [{ required: false, message: '请选择参加城乡居民基本医疗保险!' }],
                    initialValue: memberData.attendMedicare,
                  })(
                    <Select
                      placeholder="请选择参加城乡居民基本医疗保险"
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
              </Col>
              <Col span={12}>
                <FormItem label="参加城乡居民基本养老保险">
                  {getFieldDecorator('attendEndowment', {
                    rules: [{ required: false, message: '请选择参加城乡居民基本养老保险!' }],
                    initialValue: memberData.attendEndowment,
                  })(
                    <Select
                      placeholder="请选择参加城乡居民基本养老保险"
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
              </Col>
            </Row>
            <Row
              type="flex"
              gutter={24}
              justify="space-around"
              align="middle"
              style={{
                backgroundColor: '#FAFAFA',
                border: '1px solid #e9e9e9',
              }}
            >
              <Col span={16}>
                <FormItem
                  style={{
                    marginBottom: '0',
                    color: '#000000d8',
                    fontWeight: '800',
                  }}
                >
                  {'在校生状况：'}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem style={{ marginBottom: '0' }}>
                  {getFieldDecorator('studentSituation', {
                    rules: [{ required: false, message: '请选择在校生状况!' }],
                    initialValue: memberData.studentSituation,
                  })(
                    <Select
                      placeholder="请选择在校生状况"
                      onChange={this.handleChangeStudentSituation}
                    >
                      <Select.Option key="0" value="非在校生">
                        非在校生
                      </Select.Option>
                      <Select.Option key="1" value="学前教育">
                        学前教育
                      </Select.Option>
                      <Select.Option key="2" value="小学">
                        小学
                      </Select.Option>
                      <Select.Option key="3" value="七年级">
                        七年级
                      </Select.Option>
                      <Select.Option key="4" value="八年级">
                        八年级
                      </Select.Option>
                      <Select.Option key="5" value="九年级">
                        九年级
                      </Select.Option>
                      <Select.Option key="6" value="高中一年级">
                        高中一年级
                      </Select.Option>
                      <Select.Option key="7" value="高中二年级">
                        高中二年级
                      </Select.Option>
                      <Select.Option key="8" value="高中三年级">
                        高中三年级
                      </Select.Option>
                      <Select.Option key="9" value="大专及以上">
                        大专及以上
                      </Select.Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row
              gutter={24}
              style={{
                borderLeft: '1px solid #e9e9e9',
                borderRight: '1px solid #e9e9e9',
                borderBottom: '1px solid #e9e9e9',
                display: studentSituation === '非在校生' ? 'none' : 'block',
              }}
            >
              <Col span={8}>
                <FormItem label="就读学校">
                  {getFieldDecorator('school', {
                    rules: [{ required: false, message: '请输入就读学校!' }],
                    initialValue: memberData.school,
                  })(<Input placeholder="请输入就读学校" />)}
                </FormItem>
                <FormItem label="学前教育保教、生活补助">
                  {getFieldDecorator('preSchoolLifeSubsidyNote', {
                    rules: [{ required: false, message: '请选择学前教育保教、生活补助!' }],
                    initialValue: memberData.preSchoolLifeSubsidyNote,
                  })(
                    <Select
                      placeholder="请选择学前教育保教、生活补助"
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
                <FormItem label="高中免学费住宿费、中职免学费">
                  {getFieldDecorator('freeTuitionNote', {
                    rules: [{ required: false, message: '请选择高中免学费住宿费、中职免学费!' }],
                    initialValue: memberData.freeTuitionNote,
                  })(
                    <Select
                      placeholder="请选择高中免学费住宿费、中职免学费"
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
                <FormItem label="雨露计划">
                  {getFieldDecorator('yuLuPlan', {
                    rules: [{ required: false, message: '请选择雨露计划!' }],
                    initialValue: memberData.yuLuPlan,
                  })(
                    <Select
                      placeholder="请选择雨露计划"
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
              </Col>
              <Col span={8}>
                <FormItem label="就学地点">
                  {getFieldDecorator('placeOfStudy', {
                    rules: [{ required: false, message: '请输入就学地点!' }],
                    initialValue: memberData.placeOfStudy,
                  })(<Input placeholder="请输入就学地点" />)}
                </FormItem>
                <FormItem label="小学、初中寄宿生生活补助">
                  {getFieldDecorator('boarderLivingAllowanceNote', {
                    rules: [{ required: false, message: '请输入小学、初中寄宿生生活补助!' }],
                    initialValue: memberData.boarderLivingAllowanceNote,
                  })(
                    <Select
                      placeholder="请选择小学、初中寄宿生生活补助"
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
                <FormItem label="助学金">
                  {getFieldDecorator('grantNote', {
                    rules: [{ required: false, message: '请选择助学金!' }],
                    initialValue: memberData.grantNote,
                  })(
                    <Select
                      placeholder="请选择助学金"
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
              </Col>
              <Col span={8}>
                <FormItem label="是否寄宿">
                  {getFieldDecorator('boarderNote', {
                    rules: [{ required: false, message: '请输入是否寄宿!' }],
                    initialValue: memberData.boarderNote,
                  })(
                    <Select
                      placeholder="请选择是否寄宿"
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
                <FormItem label="义务教育营养改善计划">
                  {getFieldDecorator('nutritionImprovementPlanNote', {
                    rules: [{ required: false, message: '请输入义务教育营养改善计划!' }],
                    initialValue: memberData.nutritionImprovementPlanNote,
                  })(
                    <Select
                      placeholder="请选择义务教育营养改善计划"
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
                <FormItem label="助学贷款">
                  {getFieldDecorator('studentLoanNote', {
                    rules: [{ required: false, message: '请选择助学贷款!' }],
                    initialValue: memberData.studentLoanNote,
                  })(
                    <Select
                      placeholder="请选择助学贷款"
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
              </Col>
            </Row>
            <Row
              type="flex"
              gutter={24}
              justify="space-around"
              align="middle"
              style={{
                backgroundColor: '#FAFAFA',
                marginTop: '16px',
                border: '1px solid #e9e9e9',
              }}
            >
              <Col span={16}>
                <FormItem
                  style={{
                    marginBottom: '0',
                    color: '#000000d8',
                    fontWeight: '800',
                  }}
                >
                  {'务工状况：'}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem style={{ marginBottom: '0' }}>
                  {getFieldDecorator('workInfo', {
                    rules: [{ required: false, message: '请选择务工状况!' }],
                    initialValue: memberData.workInfo,
                  })(
                    <Select placeholder="请选择务工状况" onChange={this.handleChangeWorkInfo}>
                      <Select.Option key="0" value="无">
                        无
                      </Select.Option>
                      <Select.Option key="1" value="省外务工">
                        省外务工
                      </Select.Option>
                      <Select.Option key="2" value="县外省内务工">
                        县外省内务工
                      </Select.Option>
                      <Select.Option key="3" value="乡（镇）外县内务工">
                        乡（镇）外县内务工
                      </Select.Option>
                      <Select.Option key="4" value="乡（镇）内务工">
                        乡（镇）内务工
                      </Select.Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row
              gutter={24}
              style={{
                borderLeft: '1px solid #e9e9e9',
                borderRight: '1px solid #e9e9e9',
                borderBottom: '1px solid #e9e9e9',
                display: workInfo === '无' ? 'none' : 'block',
              }}
            >
              <Col span={8}>
                <FormItem label="务工地区">
                  {getFieldDecorator('workArea', {
                    rules: [{ required: false, message: '请输入务工地区!' }],
                    initialValue: memberData.workArea,
                  })(<Input placeholder="请输入务工地区" />)}
                </FormItem>
                <FormItem label="务工时间（月）">{memberData.workTime}</FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="务工工种">
                  {getFieldDecorator('workType', {
                    rules: [{ required: false, message: '请输入务工工种!' }],
                    initialValue: memberData.workType,
                  })(<Input placeholder="请输入务工工种" />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="平均月收入（元）">{memberData.workMonthlyIncome}</FormItem>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Card>
    );
  }
}
