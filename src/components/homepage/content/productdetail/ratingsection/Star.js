import React, { Component } from 'react'
import { FaStar } from 'react-icons/fa'
import './Rating.css'


const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
}

export default class Star extends Component {
    render() {
        const styles = {
            stars: {
                display: "flex",
                flexDirection: "row",
            }
        }
        const stars = Array(5).fill(0)
        return (
            <div className="star-margin" style={styles.stars}>
                {stars.map((_, index) => {
                    return (
                        <FaStar
                            key={index}
                            size={16}
                            color={(this.props.ratingPoint) > index ? colors.orange : colors.grey}
                            style={{
                                marginRight: 10
                            }}
                        />
                    )
                })}
            </div>
        )
    }
}
