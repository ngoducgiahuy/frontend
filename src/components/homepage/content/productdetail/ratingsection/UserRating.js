import React, { Component } from 'react'
import { FaStar } from 'react-icons/fa'
import Cookies from 'js-cookie';
import { post } from '../../../../utils/httpHelper';

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
}
export default class UserRating extends Component {
    state = {
        currentValue: 0,
        hoverValue: undefined,
        commentPlaceHolder: "Your comment about product",
        commentValue: "",
        productId: this.props.productId,
        userId: Cookies.get('id'),
    }

    render() {
        const styles = {
            container: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            },
            stars: {
                display: "flex",
                flexDirection: "row",
            },
            textarea: {
                border: "1px solid #a9a9a9",
                borderRadius: 5,
                padding: 10,
                margin: "20px 0",
                minHeight: 100,
                width: 300
            },
            button: {
                border: "1px solid #a9a9a9",
                borderRadius: 5,
                width: 300,
                padding: 10,
            }
        }
        const stars = Array(5).fill(0)

        const handleClick = value => {
            this.setState({ currentValue: value });
        }

        const changeComment = e => {
            this.setState({ commentValue: e.target.value });
        }

        const submitRating = (e) => {
            // alert(this.state.currentValue);
            // alert(this.state.commentValue);
            // alert(this.state.productId);
            // alert(this.state.userId);

            e.preventDefault();

            const body = JSON.stringify({
                customerId: this.state.userId,
                productId: this.state.productId,
                ratingPoint: this.state.currentValue,
                comment: this.state.commentValue,
            });

            post("/ratings", body).then((response) => {
                if(response.status===200){
                    alert("Rating Success");
                    window.location.reload();
                }
            }).catch((error) => console.log(error))

            console.log(body);
        }

        const handleMouseOver = newHoverValue => {
            // setHoverValue(newHoverValue)
            this.setState({ hoverValue: newHoverValue });
        };

        const handleMouseLeave = () => {
            this.setState({ hoverValue: undefined });
        }
        return (
            <div style={styles.container}>
                <h5> Your rating </h5>
                <div style={styles.stars}>
                    {stars.map((_, index) => {
                        return (
                            <FaStar
                                key={index}
                                size={24}
                                onClick={() => handleClick(index + 1)}
                                onMouseOver={() => handleMouseOver(index + 1)}
                                onMouseLeave={handleMouseLeave}
                                color={(this.state.hoverValue || this.state.currentValue) > index ? colors.orange : colors.grey}
                                style={{
                                    marginRight: 10,
                                    cursor: "pointer"
                                }}
                            />
                        )
                    })}
                </div>
                <textarea
                    id="comment"
                    placeholder={this.state.commentPlaceHolder}
                    value={this.state.commentValue}
                    onChange={(e) => changeComment(e)}
                    style={styles.textarea}
                />

                <button
                    style={styles.button}
                    onClick={(e) => submitRating(e)}
                >
                    Submit
                </button>

            </div>
        )
    }
}
