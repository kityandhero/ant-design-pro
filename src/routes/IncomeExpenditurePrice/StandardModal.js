import React, { PureComponent } from 'react';
// import moment from 'moment';
import { connect } from 'dva';
import {
  // Row,
  // Col,
  // Card,
  Form,
  Input,
  // Select,
  // Icon,
  // Button,
  // Dropdown,
  // Menu,
  InputNumber,
  // DatePicker,
  // Tooltip,
  Modal,
  Spin,
  // Modal,
  message,
  // Badge,
  // Divider,
} from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;
// const { MonthPicker } = DatePicker;

@connect(({ incomeexpenditureprice, loading }) => ({
  incomeexpenditureprice,
  loading: loading.models.incomeexpenditureprice,
}))
@Form.create()
export default class StandardModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      metaData: {},
      saving: false,
      visible: false,
      mode: 'add',
    };
  }

  componentDidMount() {
    const { visible, mode, metaData } = this.props;
    this.setState({ visible });
    this.setState({ mode });
    this.setState({ metaData: metaData || {} });
  }

  componentWillReceiveProps(nextProps) {
    const {
      visible: { visiblePre },
    } = this.state;
    const { form, visible, mode, metaData } = nextProps;
    this.setState({ mode });
    this.setState({ metaData: metaData || {} });

    if (mode === 'add') {
      if (visiblePre === false && visible === true) {
        form.resetFields();
      }
    }
    if (mode === 'update') {
      if (visiblePre === false && visible === true) {
        form.resetFields();
      }
    }
    this.setState({ visible });
  }

  handleOk = e => {
    e.preventDefault();
    const { dispatch, form, afterOK, category, mode } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        this.setState({ saving: true });
        const submitValue = values;
        submitValue.category = category;
        let dispatchType = '';
        let canSubmit = false;

        if (mode === 'add') {
          dispatchType = 'incomeexpenditureprice/add';
          canSubmit = true;
        } else if (mode === 'update') {
          const { metaData } = this.state;
          submitValue.incomeExpenditurePriceId = metaData.incomeExpenditurePriceId;
          dispatchType = 'incomeexpenditureprice/update';
          canSubmit = true;
        } else {
          message.error(`组件配置错误，未知的提交模式${mode}！`);
        }

        if (canSubmit) {
          dispatch({
            type: dispatchType,
            payload: submitValue,
          }).then(() => {
            const {
              incomeexpenditureprice: { data },
            } = this.props;
            const { status } = data;
            this.setState({ saving: false });
            if (status === 200) {
              this.setState({ visible: false });
              afterOK();
            }
          });
        }
      }
    });
  };

  handleCancel = e => {
    e.preventDefault();
    const { afterCancel } = this.props;
    this.setState({ visible: false });
    afterCancel();
  };

  render() {
    const { form } = this.props;
    const { visible, mode, metaData, saving } = this.state;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 },
      },
    };
    return (
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Spin spinning={saving}>
          <Form>
            <FormItem
              {...formItemLayout}
              label="标准名称"
              hasFeedback
              help="名称能表达出标准的含义"
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入标准名称!' }],
                initialValue: mode === 'add' ? '' : metaData.name,
              })(<Input placeholder="请输入标准名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="计量单位" hasFeedback>
              {getFieldDecorator('unitName', {
                rules: [{ required: true, message: '请输入计量单位!' }],
                initialValue: mode === 'add' ? '' : metaData.unitName,
              })(<Input placeholder="请输入计量单位" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="最高价" hasFeedback>
              {getFieldDecorator('max', {
                rules: [{ required: true, message: '请输入最高价!' }],
                initialValue: mode === 'add' ? '' : metaData.max,
              })(<InputNumber style={{ width: '100%' }} placeholder="请输入最高价" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="最低价" hasFeedback>
              {getFieldDecorator('min', {
                rules: [{ required: true, message: '请输入最低价!' }],
                initialValue: mode === 'add' ? '' : metaData.min,
              })(<InputNumber style={{ width: '100%' }} placeholder="请输入最低价" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="平均价" hasFeedback>
              {getFieldDecorator('average', {
                rules: [{ required: true, message: '请输入平均价!' }],
                initialValue: mode === 'add' ? '' : metaData.average,
              })(<InputNumber style={{ width: '100%' }} placeholder="请输入平均价" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="简介描述" hasFeedback>
              {getFieldDecorator('description', {
                rules: [{ required: false, message: '请输入简介描述!' }],
                initialValue: mode === 'add' ? '' : metaData.description,
              })(<TextArea placeholder="请输入简介描述" autosize={{ minRows: 3, maxRows: 7 }} />)}
            </FormItem>
          </Form>
        </Spin>
      </Modal>
    );
  }
}
