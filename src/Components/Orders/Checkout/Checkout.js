import React, { Component } from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import Spinner from '../../Spinner/Spinner';
import { resetIngredients } from '../../../redux/actionCreators';

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable
    }
}
const mapDispatchToProps = dispatch => {
    return {
        resetIngredients: () => dispatch(resetIngredients())
    }
}

class Checkout extends Component {
    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery"
        },
        isLoading: false,
        isModalOpen: false,
        modalMsg: ""
    }

    goBack = () => {
        this.props.history.goBack("/");
    }
    inputChangeHandler = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value
            }
        })
    }
    submitedHandler = () => {
        this.setState({
            isLoading: true
        })
        const order = {
            ingredient: this.props.ingredients,
            customer: this.state.values,
            price: this.props.totalPrice,
            orderTime: new Date()
        }
        axios.post("https://burger-builder-e6055-default-rtdb.firebaseio.com/orders.json", order)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Order Placed Successfully!"
                    })
                    this.props.resetIngredients();
                }
                else {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Something went rong! Order Again!"
                    })
                }
            })
            .catch(error => {
                this.setState({
                    isLoading: false,
                    isModalOpen: true,
                    modalMsg: "Something went rong! Order Again!"
                })
            })

        // console.log(order);
    }

    render() {
        let form = (<div>
            <h4 style={{
                border: "1px solid gray", borderBottom: "none",
                padding: "40px", width: "80%", margin: "auto"
            }}>Payment: {this.props.totalPrice} BDT</h4>

            <form style={{
                border: "1px solid gray",
                padding: "40px", width: "80%", margin: "auto"
            }}>
                <textarea
                    name="deliveryAddress"
                    value={this.state.values.deliveryAddress}
                    className="form-control"
                    placeholder="Your Address"
                    onChange={this.inputChangeHandler}
                ></textarea>  <br />

                <input name="phone"
                    value={this.state.values.phone}
                    className="form-control"
                    placeholder="Your Phone Number"
                    onChange={this.inputChangeHandler}
                />   <br />

                <select
                    name="paymentType"
                    value={this.state.values.paymentType}
                    className="form-control"
                    onChange={this.inputChangeHandler}
                >
                    <option value="Cash On Delivery">Cash On Delivery</option>
                    <option value="Bkash">Bkash</option>
                </select>   <br />

                <Button onClick={this.submitedHandler} disabled={!this.props.purchasable} style={{ backgroundColor: "#D70F64", marginRight: "5px" }}> Place Order </Button>
                <Button onClick={this.goBack} color="secondary"> Cancel </Button>
            </form>
        </div>)

        return (
            <div>
                {this.state.isLoading ? <Spinner /> : form}
                <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
                    <ModalBody>
                        <p>{this.state.modalMsg}</p>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);