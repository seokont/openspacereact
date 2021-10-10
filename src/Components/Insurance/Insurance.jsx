import 'antd/dist/antd.css';
import {Row, Col, Divider} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import {Form, Input, InputNumber, Button, Checkbox, Modal} from 'antd';
import React, {useState} from 'react';
import styles from './Insurance.module.css'
import {addConsuranceItem, addEventValue, addInsurancee} from "../../Reducer/insurance-reducer";

const Insurance = (props) => {
    const [count, setCount] = useState(0);
    const onFinish = (values) => {
        console.log('Success:', values);
        debugger
        props.addInsurancee({
            name: values.name,
            сoverage_min: typeof values.coveragemin == "string" ? 0 : values.coveragemin,
            сoverage_max: typeof values.coveragemax == "string" ? 0 : values.coveragemax,
            risk: Number(values.risk),
            total: 0,
            value: 0
        })
        setIsModalVisible(false);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const style = {background: '#0092ff', padding: '8px 0', color: '#fff', fontSize: '20px'};
    let deleteItem = (id) => {
        props.addConsuranceItem(id)
    }
    let p = () => {
        let sum = 0
        props.Insurance.map(l => {
            sum += l.total;
        })
        return sum
    }
    let enterAmount = (event, id, risk, min, max) => {
        if (Number(event.target.value) > min && Number(event.target.value) < max) {
            let u = Number(event.target.value) * risk / 100
            props.addEventValue({value: Number(event.target.value), id: id, total: u})
        }
    }
    return (
        <>
            <Button type="primary" onClick={showModal}>Add</Button>
            <Modal title="Add" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{required: true, message: 'Please input Name'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Coverage min"
                        name="coveragemin"
                        rules={[{required: true, message: 'Please input Coverage Min!'}]}
                    >
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item
                        label="Coverage max"
                        name="coveragemax"
                        rules={[{required: true, message: 'Please input Coverage Max!'}]}
                    >
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item
                        label="Risk"
                        name="risk"
                        rules={[{required: true, message: 'Please input Coverage Risk(%)!'}]}
                    >
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Divider orientation="left">Insurance</Divider>
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                {props.Insurance.map(n => {
                    return <Col key={n.id} className='gutter-row' span={6}>
                        <div style={{cursor: 'pointer'}} onClick={() => deleteItem(n.id)}><CloseOutlined/></div>
                        <div style={style}>{n.name}</div>
                        <div style={style}>Coverage: $ {n.сoverage_min} - {n.сoverage_max}</div>
                        <div style={style}>Risk: {n.risk} %</div>
                        <div>Enter the insurance amount: <Input placeholder="Amount" onChange={(e) => {
                            enterAmount(e, n.id, n.risk, n.сoverage_min, n.сoverage_max)
                        }}/></div>
                        <div
                            style={style}>{n.value != '' ? 'Calculated based on the risk: ' + (n.value * n.risk / 100) : `Enter the range ${n.сoverage_min} - ${n.сoverage_max}`}</div>
                    </Col>
                })}
            </Row>
            <div className={styles.total}>Total Sum($): {p()}</div>
        </>
    )
}
export default Insurance;
