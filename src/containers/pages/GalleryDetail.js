
import React, { Component } from "react";
import { injectIntl } from "react-intl";
import Lightbox from 'react-image-lightbox';
import { NavLink } from "react-router-dom";
import validator from "validator/es";
import {DOMAIN} from "../../services/APIURL";
class GalleryDetail extends Component {
    constructor(props) {
        super(props);
        this.onThumbClick = this.onThumbClick.bind(this);
        this.state = {
            photoIndex: 0,
            isOpen: false,
            images:[],
            thumbs:[]
        };

    }
    componentDidMount() {
        if (this.props.gallery){
            const images = this.props.gallery.map((item)=>{
                if (validator.isURL(item)){
                    return item;
                }else {
                    return DOMAIN+item;
                }
            })
            this.setState({
                images:images,
                thumbs:images,
            })
        }
    }

    onThumbClick(index) {
        this.setState({ photoIndex: index });
        this.setState({ isOpen: true });
    }

    render() {
        const { photoIndex, isOpen,thumbs,images } = this.state;
        return (
            <div>
                <div className="row social-image-row gallery">
                    {
                        thumbs.map((item, index) => {
                            return (
                                <div className="col-3" key={index}>
                                    <NavLink to="#" onClick={() => this.onThumbClick(index)}>
                                        <img className="img-fluid border-radius" src={item} alt="thumbnail" />
                                    </NavLink>
                                </div>
                            )
                        })
                    }
                </div>
                {isOpen && (
                    <Lightbox
                        mainSrc={images[photoIndex]}
                        nextSrc={images[(photoIndex + 1) % images.length]}
                        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + images.length - 1) % images.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % images.length,
                            })
                        }
                    />
                )}
            </div>
        );
    }
}

export default injectIntl(GalleryDetail);