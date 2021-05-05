import React from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";

import axios from "axios";


class Payment extends React.Component{

    constructor(props) {
        super(props);

        this.state =this.initialState;

        this.submitPaymentDetails = this.submitPaymentDetails.bind(this);
        this.changeCardType = this.changeCardType.bind(this);
        this.changeCardNumber = this.changeCardNumber.bind(this);
        this.changeExpirationYear = this.changeExpirationYear.bind(this);
        this.changeExpirationMonth = this.changeExpirationMonth.bind(this);
        this.changeCvc = this.changeCvc.bind(this);
        this.resetPaymentDetails = this.resetPaymentDetails.bind(this);

    }

    initialState ={
        cardType:'',
        cardNumber:'',
        expirationYear:'',
        expirationMonth:'',
        cvc:'',
        amount:2000.00,
        merchantId:121,

        paymentStatus:'',
        paymentMessage:'',
        validCardBool:'',
        paymentSuccessfulBool:'',

        paymentGateWayStatus:'up'
    }

    componentDidMount() {

        this.setState({amount:2000.00})
    }

    resetPaymentDetails = () => {

        this.setState(() => this.initialState)

    }
    submitPaymentDetails = (event) => {
        event.preventDefault();

        const URL_PAYMENTGATEWAY = "http://localhost:8080/paytime/api/makePayment";

        const PaymentRequest ={
            cardType:this.state.cardType,
            usercardNumber:this.state.cardNumber,
            userExpirationYear:this.state.expirationYear,
            userExpirationmonth: this.state.expirationMonth,
            userCvc: this.state.cvc,
            amount: this.state.amount,
            merchantId: this.state.merchantId
        }

        axios.post(URL_PAYMENTGATEWAY,PaymentRequest)
            .then(response => response.data)
            .then((data) => {
                this.setState({paymentStatus:data.status})
                this.setState({paymentMessage:data.message})
            }).catch(error => {
                    this.setState({paymentGateWayStatus:'down'})
                console.log( error);
        })
    }

    changeCardType =(event) => {
        event.preventDefault();
        this.setState({cardType:event.target.value})
    }

    changeCardNumber = (event) => {
        event.preventDefault();
        this.setState({cardNumber:event.target.value})
    }

    changeExpirationYear = (event) => {
        event.preventDefault();
        this.setState({expirationYear:event.target.value})
    }

    changeExpirationMonth = (event) => {
        event.preventDefault();
        this.setState({expirationMonth:event.target.value})
    }

    changeCvc = (event) => {
        event.preventDefault();
        this.setState({cvc:event.target.value})
    }



    render() {

        const padding={
            padding:'20px'
        }

        const{cardType, cardNumber, expirationYear, expirationMonth,cvc, amount}=this.state
        return (
            <div style={padding}>

                <h2>Card Payment</h2>

                <Card className={'border border-dark bg-light'}>
                    <Card.Header>Payment Amount: Rs.{this.state.amount}</Card.Header>

                    <Form id={'cardPaymentForm'} onSubmit={this.submitPaymentDetails.bind(this)}
                          onReset={this.resetPaymentDetails.bind(this)} id={'paymentForm'}>
                        <Card.Body>

                            <Form.Row>
                                <Form.Group controlId={'formCardType'} as={Col}>
                                    <Form.Label>Card Type</Form.Label>
                                    <Form.Control
                                        as={'select'} required name={'cardType'}
                                        defaultValue={'Visa'}
                                        value={cardType}
                                        onChange={this.changeCardType.bind(this)}

                                    >
                                        <option value={'Visa'}>Visa</option>
                                        <option value={'master'}>Master</option>

                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId={'formCardNumber'} as={Col}>

                                    <Form.Label>Card Number</Form.Label>
                                    <Form.Control
                                    required
                                    type={'text'}
                                    pattern={'[0-9]{16}'}
                                    name={'cardNumber'}
                                    placeHolder={'Enter card number'}
                                    value={cardNumber}
                                    maxlength={16}
                                    onChange={this.changeCardNumber.bind(this)}>
                                    </Form.Control>

                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group controlId={'formExpirationYear'} as={Col}>
                                    <Form.Label>Expiration Year</Form.Label>
                                    <Form.Control
                                        as={'select'} required name={'expirationYear'}
                                        defaultValue={'2021'}
                                        value={expirationYear}
                                        onChange={this.changeExpirationYear.bind(this)}

                                    >
                                        <option value={'2021'}>2021</option>
                                        <option value={'2022'}>2022</option>
                                        <option value={'2023'}>2023</option>
                                        <option value={'2024'}>2024</option>
                                        <option value={'2025'}>2025</option>
                                        <option value={'2026'}>2021</option>
                                        <option value={'2027'}>2027</option>
                                        <option value={'2028'}>2028</option>
                                        <option value={'2029'}>2029</option>
                                        <option value={'2030'}>2030</option>


                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Expiration Month</Form.Label>
                                    <Form.Control
                                        as={'select'} required name={'expirationMonth'}
                                        defaultValue={'01'}
                                        value={expirationMonth}
                                        onChange={this.changeExpirationMonth.bind(this)}

                                    >
                                        <option value={1}>01</option>
                                        <option value={2}>02</option>
                                        <option value={3}>03</option>
                                        <option value={4}>04</option>
                                        <option value={5}>05</option>
                                        <option value={6}>06</option>
                                        <option value={7}>07</option>
                                        <option value={8}>08</option>
                                        <option value={9}>09</option>
                                        <option value={10}>10</option>
                                        <option value={11}>11</option>
                                        <option value={12}>12</option>


                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId={'formCvc'} as={Col}>

                                    <Form.Label>CVC</Form.Label>
                                    <Form.Control
                                        required
                                        type={'text'}
                                        pattern={'[0-9]{3}'}
                                        name={'cvc'}
                                        placeHolder={'Enter cvc number'}
                                        value={cvc}
                                        maxlength={3}
                                        onChange={this.changeCvc.bind(this)}>
                                    </Form.Control>

                                </Form.Group>
                            </Form.Row>



                        </Card.Body>


                        <Card.Footer>
                            <Row>
                                <Col>
                                    <Button className={'btn btn-primary'} type={'submit'}>Pay</Button>
                                </Col>
                                <Col>
                                    <Button className={'btn btn-secondary'} type={'reset'}>Reset</Button>
                                </Col>
                            </Row>
                        </Card.Footer>



                    </Form>
                </Card>


                {
                    this.state.paymentStatus != '' ?
                        <div>
                            {
                                this.state.paymentStatus == 'success'?
                                    <div>
                                        <h2>Payment Sucesful</h2>
                                    </div>:
                                    <div>
                                        <h2>Error when procssing payment</h2>
                                        <h3>{this.state.paymentMessage}</h3>
                                    </div>
                            }
                        </div>:
                        <div>
                            {
                                this.state.paymentGateWayStatus == 'down'?
                                    <div>
                                        <h2>Payment Gateway did not respond.</h2>
                                    </div>:
                                    <div></div>
                            }
                        </div>
                }



            </div>
        );
    }

}

export default Payment;