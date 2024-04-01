export const TEMPLATE_CONTACT = `
   <div class="mb-8">
       <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835252972956!2d144.95592398991224!3d-37.817327693787625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sin!4v1575470633967!5m2!1sen!2sin" width="100%" height="514" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
   </div>
<div class="container">
                <div class="row mb-10">
                    <div class="col-md-8 col-xl-9">
                        <div class="mr-xl-6">
                            <div class="border-bottom border-color-1 mb-5">
                                <h3 class="section-title mb-0 pb-2 font-size-25">Leave us a Message</h3>
                            </div>
                            <p class="max-width-830-xl text-gray-90">Maecenas dolor elit, semper a sem sed, pulvinar molestie lacus. Aliquam dignissim, elit non mattis ultrices, neque odio ultricies tellus, eu porttitor nisl ipsum eu massa.</p>
                            <form class="js-validate" novalidate="novalidate">
                                <div class="row">
                                    <div class="col-md-6">
                                        <!-- Input -->
                                        <div class="js-form-message mb-4">
                                            <label class="form-label">
                                                First name
                                                <span class="text-danger">*</span>
                                            </label>
                                            <input type="text" class="form-control" name="firstName" placeholder="" aria-label="" required="" data-msg="Please enter your frist name." data-error-class="u-has-error" data-success-class="u-has-success" autocomplete="off">
                                        </div>
                                        <!-- End Input -->
                                    </div>

                                    <div class="col-md-6">
                                        <!-- Input -->
                                        <div class="js-form-message mb-4">
                                            <label class="form-label">
                                                Last name
                                                <span class="text-danger">*</span>
                                            </label>
                                            <input type="text" class="form-control" name="lastName" placeholder="" aria-label="" required="" data-msg="Please enter your last name." data-error-class="u-has-error" data-success-class="u-has-success">
                                        </div>
                                        <!-- End Input -->
                                    </div>

                                    <div class="col-md-12">
                                        <!-- Input -->
                                        <div class="js-form-message mb-4">
                                            <label class="form-label">
                                                Subject
                                            </label>
                                            <input type="text" class="form-control" name="Subject" placeholder="" aria-label="" data-msg="Please enter subject." data-error-class="u-has-error" data-success-class="u-has-success">
                                        </div>
                                        <!-- End Input -->
                                    </div>
                                    <div class="col-md-12">
                                        <div class="js-form-message mb-4">
                                            <label class="form-label">
                                                Your Message
                                            </label>

                                            <div class="input-group">
                                                <textarea class="form-control p-5" rows="4" name="text" placeholder=""></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <button type="submit" class="btn btn-primary-dark-w px-5">Send Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="col-md-4 col-xl-3">
                        <div class="border-bottom border-color-1 mb-5">
                            <h3 class="section-title mb-0 pb-2 font-size-25">Our Store</h3>
                        </div>
                        <div class="mr-xl-6">
                            <address class="mb-6">
                                121 King Street, <br>
                                Melbourne VIC 3000, <br>
                                Australia
                            </address>
                            <h5 class="font-size-14 font-weight-bold mb-3">Hours of Operation</h5>
                            <ul class="list-unstyled mb-6">
                                <li class="flex-center-between mb-1"><span class="">Monday:</span><span class="">12-6 PM</span></li>
                                <li class="flex-center-between mb-1"><span class="">Tuesday:</span><span class="">12-6 PM</span></li>
                                <li class="flex-center-between mb-1"><span class="">Wednesday:</span><span class="">12-6 PM</span></li>
                                <li class="flex-center-between mb-1"><span class="">Thursday:</span><span class="">12-6 PM</span></li>
                                <li class="flex-center-between mb-1"><span class="">Friday:</span><span class="">12-6 PM</span></li>
                                <li class="flex-center-between mb-1"><span class="">Saturday:</span><span class="">12-6 PM</span></li>
                                <li class="flex-center-between"><span class="">Sunday</span><span class="">Closed</span></li>
                            </ul>
                            <h5 class="font-size-14 font-weight-bold mb-3">Careers</h5>
                            <p class="text-gray-90">If you’re interested in employment opportunities at Electro, please email us: <a class="text-blue text-decoration-on" href="mailto:contact@yourstore.com">contact@yourstore.com</a></p>
                        </div>
                    </div>
                </div>
           
            </div>`
export const TEMPLATE_ABOUT = `
<div class="container">
                    <div class="flex-content-center max-width-620-lg flex-column mx-auto text-center min-height-564">
                        <h1 class="h1 font-weight-bold">About Us</h1>
                        <p class="text-gray-39 font-size-18 text-lh-default">Passion may be a friendly or eager interest in or admiration for a proposal, cause, discovery, or activity or love to a feeling of unusual excitement.</p>
                    </div>
                </div>
<div class="container">
                <div class="row">
                    <div class="col-md-4 mb-4 mb-md-0">
                        <div class="card mb-3 border-0 text-center rounded-0">
                            <img class="img-fluid mb-3" src="../../assets/img/500X300/img1.jpg" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="font-size-18 font-weight-semi-bold mb-3">What we really do?</h5>
                                <p class="text-gray-90 max-width-334 mx-auto">Donec libero dolor, tincidunt id laoreet vitae, ullamcorper eu tortor. Maecenas pellentesque, dui vitae iaculis mattis, tortor nisi faucibus magna,vitae ultrices lacus purus vitae metus.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-4 mb-md-0">
                        <div class="card mb-3 border-0 text-center rounded-0">
                            <img class="img-fluid mb-3" src="../../assets/img/500X300/img2.jpg" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="font-size-18 font-weight-semi-bold mb-3">Our Vision</h5>
                                <p class="text-gray-90 max-width-334 mx-auto">Donec libero dolor, tincidunt id laoreet vitae, ullamcorper eu tortor. Maecenas pellentesque, dui vitae iaculis mattis, tortor nisi faucibus magna,vitae ultrices lacus purus vitae metus.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card mb-3 border-0 text-center rounded-0">
                            <img class="img-fluid mb-3" src="../../assets/img/500X300/img3.jpg" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="font-size-18 font-weight-semi-bold mb-3">History of Beginning</h5>
                                <p class="text-gray-90 max-width-334 mx-auto">Donec libero dolor, tincidunt id laoreet vitae, ullamcorper eu tortor. Maecenas pellentesque, dui vitae iaculis mattis, tortor nisi faucibus magna,vitae ultrices lacus purus vitae metus.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
<div class="bg-gray-1 py-12 mb-10 mb-lg-15">
                <div class="container">
                    <div class="row">
                        <div class="col-md-4 mb-5 mb-xl-0 col-xl text-center">
                            <img class="img-fluid mb-3 rounded-circle" src="../../assets/img/300X300/img16.jpg" alt="Card image cap">
                            <h2 class="font-size-18 font-weight-semi-bold mb-0">Thomas Snow</h2>
                            <span class="text-gray-41">CEO/Founder</span>
                        </div>
                        <div class="col-md-4 mb-5 mb-xl-0 col-xl text-center">
                            <img class="img-fluid mb-3 rounded-circle" src="../../assets/img/300X300/img17.jpg" alt="Card image cap">
                            <h2 class="font-size-18 font-weight-semi-bold mb-0">Anna Baranov</h2>
                            <span class="text-gray-41">Client Care</span>
                        </div>
                        <div class="col-md-4 mb-5 mb-xl-0 col-xl text-center">
                            <img class="img-fluid mb-3 rounded-circle" src="../../assets/img/300X300/img18.jpg" alt="Card image cap">
                            <h2 class="font-size-18 font-weight-semi-bold mb-0">Andre Kowalsy</h2>
                            <span class="text-gray-41">Support Boss</span>
                        </div>
                        <div class="col-md-4 mb-5 mb-xl-0 col-xl text-center">
                            <img class="img-fluid mb-3 rounded-circle" src="../../assets/img/300X300/img19.jpg" alt="Card image cap">
                            <h2 class="font-size-18 font-weight-semi-bold mb-0">Pamela Doe</h2>
                            <span class="text-gray-41">Delivery Driver</span>
                        </div>
                        <div class="col-md-4 mb-5 mb-xl-0 col-xl text-center">
                            <img class="img-fluid mb-3 rounded-circle" src="../../assets/img/300X300/img20.jpg" alt="Card image cap">
                            <h2 class="font-size-18 font-weight-semi-bold mb-0">Susan McCain</h2>
                            <span class="text-gray-41">Packaging Girl</span>
                        </div>
                        <div class="col-md-4 mb-5 mb-xl-0 col-xl text-center">
                            <img class="img-fluid mb-3 rounded-circle" src="../../assets/img/300X300/img21.png" alt="Card image cap">
                            <h2 class="font-size-18 font-weight-semi-bold mb-0">See Details</h2>
                        </div>
                    </div>
                </div>
            </div>
 <div class="container mb-8 mb-lg-0">
                <div class="row mb-8">
                    <div class="col-lg-7">
                        <div class="row">
                            <div class="col-lg-6 mb-5 mb-lg-8">
                                <h3 class="font-size-18 font-weight-semi-bold text-gray-39 mb-4">What we really do?</h3>
                                <p class="text-gray-90">Donec libero dolor, tincidunt id laoreet vitae, ullamcorper eu tortor. Maecenas pellentesque, dui vitae iaculis mattis, tortor nisi faucibus magna, vitae ultrices lacus purus vitae metus. Ut nec odio facilisis, ultricies nunc eget, fringilla orci.</p>
                            </div>
                            <div class="col-lg-6 mb-5 mb-lg-8">
                                <h3 class="font-size-18 font-weight-semi-bold text-gray-39 mb-4">Our Vision</h3>
                                <p class="text-gray-90">Vestibulum velit nibh, egestas vel faucibus vitae, feugiat sollicitudin urna. Praesent iaculis id ipsum sit amet pretium. Aliquam tristique sapien nec enim euismod, scelerisque facilisis arcu consectetur. Vestibulum velit nibh, egestas vel faucibus vitae.</p>
                            </div>
                            <div class="col-lg-6 mb-5 mb-lg-8">
                                <h3 class="font-size-18 font-weight-semi-bold text-gray-39 mb-4">History of the Company</h3>
                                <p class="text-gray-90">Mauris rhoncus aliquet purus, a ornare nisi euismod in. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam imperdiet eu metus vel ornare. Nullam in risus vel orci feugiat vestibulum. In sed aliquam mi. Nullam condimentum sollicitudin dui.</p>
                            </div>
                            <div class="col-lg-6 mb-5 mb-lg-8">
                                <h3 class="font-size-18 font-weight-semi-bold text-gray-39 mb-4">Cooperate with Us!</h3>
                                <p class="text-gray-90">Donec libero dolor, tincidunt id laoreet vitae, ullamcorper eu tortor. Maecenas pellentesque, dui vitae iaculis mattis, tortor nisi faucibus magna, vitae ultrices lacus purus vitae metus. Ut nec odio facilisis, ultricies nunc eget, fringilla orci.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="ml-lg-8">
                            <h3 class="font-size-18 font-weight-semi-bold text-gray-39 mb-4">What can we do for you ?</h3>
                            <!-- Basics Accordion -->
                            <div id="basicsAccordion1" class="about-accordion">
                                <!-- Card -->
                                <div class="card mb-4 border-color-4 rounded-0">
                                    <div class="card-header card-collapse border-color-4" id="basicsHeadingOne">
                                        <h5 class="mb-0">
                                            <button type="button" class="btn btn-link btn-block flex-horizontal-center card-btn p-0 font-size-18"
                                                data-toggle="collapse"
                                                data-target="#basicsCollapseOnee"
                                                aria-expanded="true"
                                                aria-controls="basicsCollapseOnee">
                                                <span class="border border-color-5 rounded font-size-12 mr-5">
                                                    <i class="fas fa-plus"></i>
                                                    <i class="fas fa-minus"></i>
                                                </span>
                                                Support 24/7
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="basicsCollapseOnee" class="collapse show"
                                        aria-labelledby="basicsHeadingOne"
                                        data-parent="#basicsAccordion1">
                                        <div class="card-body">
                                            <p class="mb-0">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                                        </div>
                                    </div>
                                </div>
                                <!-- End Card -->
                            </div>
                            <!-- End Basics Accordion -->
                        </div>
                    </div>
                </div>
        
            </div>
        `
export const TEMPLATE_TERMS = `
<div class="container">
                <div class="mb-12 text-center">
                    <h1>Terms and Conditions</h1>
                    <p class="text-gray-44">This Agreement was last modified on 18th february 2019</p>
                </div>
                <div class="mb-10">
                    <h3 class="mb-6 pb-2 font-size-25">Intellectual Propertly</h3>
                    <ol>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis diam erat. Duis velit lectus, posuere a blandit sit amet, tempor at lorem. Donec ultricies, lorem sed ultrices interdum.</li>
                        <li>Leo metus luctus sem, vel vulputate diam ipsum sed lorem. Donec tempor arcu nisl, et molestie massa scelerisque ut. Nunc at rutrum leo. Mauris metus mauris, tristique quis sapien eu, rutrum vulputate enim.</li>
                        <li>Mauris tempus erat laoreet turpis lobortis, eu tincidunt erat fermentum.</li>
                        <li>Aliquam non tincidunt urna. Integer tincidunt nec nisl vitae ullamcorper. Proin sed ultrices erat. Praesent varius ultrices massa at faucibus.</li>
                        <li>Aenean dignissim, orci sed faucibus pharetra, dui mi dignissim tortor, sit amet condimentum mi ligula sit amet augue.</li>
                        <li>Pellentesque vitae eros eget enim mollis placerat.</li>
                    </ol>
                </div>
                <div class="mb-10">
                    <h3 class="mb-6 pb-2 font-size-25">Termination</h3>
                    <ol>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis diam erat. Duis velit lectus, posuere a blandit sit amet, tempor at lorem. Donec ultricies, lorem sed ultrices interdum.</li>
                        <li>Leo metus luctus sem, vel vulputate diam ipsum sed lorem. Donec tempor arcu nisl, et molestie massa scelerisque ut. Nunc at rutrum leo. Mauris metus mauris, tristique quis sapien eu, rutrum vulputate enim.</li>
                        <li>Mauris tempus erat laoreet turpis lobortis, eu tincidunt erat fermentum.</li>
                        <li>Aliquam non tincidunt urna. Integer tincidunt nec nisl vitae ullamcorper. Proin sed ultrices erat. Praesent varius ultrices massa at faucibus.</li>
                        <li>Aenean dignissim, orci sed faucibus pharetra, dui mi dignissim tortor, sit amet condimentum mi ligula sit amet augue.</li>
                        <li>Pellentesque vitae eros eget enim mollis placerat.</li>
                    </ol>
                </div>
                <div class="mb-10">
                    <h3 class="mb-6 pb-2 font-size-25">Changes To This Agreement</h3>
                    <p class="text-gray-90">We reserve the right, at our sole discretion, to modify or replace these Terms and Conditions by posting the updated terms on the Site. Your continued use of the Site after any such changes constitutes your acceptance of the new Terms and Conditions.</p>
                </div>
                <div class="mb-10">
                    <h3 class="mb-6 pb-2 font-size-25">Contact Us</h3>
                    <p class="text-gray-90">If you have any questions about this Agreement, please contact us filling this <a href="#" class="text-blue font-weight-bold">contact form</a></p>
                </div>
              
            </div>`
export const TEMPLATE_ARTICLE = `
<article class="card mb-8 border-0">
                                <img class="img-fluid" src="../../assets/img/1500X730/img6.jpg" alt="Image Description">
                                <div class="card-body pt-5 pb-0 px-0">
                                    <div class="d-block d-md-flex flex-center-between mb-4 mb-md-0">
                                        <p class="mb-md-3 mb-1">Robot Wars – Now Closed</p>
                                        <a href="#" class="font-size-12 text-gray-5 ml-md-4"><i class="far fa-comment"></i> Leave a comment</a>
                                    </div>
                                    <div class="mb-3 pb-3 border-bottom">
                                        <div class="list-group list-group-horizontal flex-wrap list-group-borderless align-items-center mx-n0dot5">
                                            <a href="../blog/single-blog-post.html" class="mx-0dot5 text-gray-5">Design,</a>
                                            <a href="../blog/single-blog-post.html" class="mx-0dot5 text-gray-5"> Technology,</a>
                                            <a href="../blog/single-blog-post.html" class="mx-0dot5 text-gray-5"> News,</a>
                                            <a href="../blog/single-blog-post.html" class="mx-0dot5 text-gray-5"> Image</a>
                                            <span class="mx-2 font-size-n5 mt-1 text-gray-5"><i class="fas fa-circle"></i></span>
                                            <a href="../blog/single-blog-post.html" class="mx-0dot5 text-gray-5">March 4, 2016</a>
                                        </div>
                                    </div>
                                    <p><strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, erat in malesuada aliquam, est erat faucibus purus, eget viverra nulla sem vitae neque. Quisque id sodales libero. In nec enim nisi, in ultricies quam. Sed lacinia feugiat velit, cursus molestie lectus mollis et.</strong></p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, erat in malesuada aliquam, est erat faucibus purus, eget viverra nulla sem vitae neque. Quisque id sodales libero. In nec enim nisi, in ultricies quam. Sed lacinia feugiat velit, cursus molestie lectus.</p>
                                    <p>Mauris tempus erat laoreet turpis lobortis, eu tincidunt erat fermentum. Aliquam non tincidunt urna. Integer tincidunt nec nisl vitae ullamcorper. Proin sed ultrices erat. Praesent varius ultrices massa at faucibus. Aenean dignissim, orci sed faucibus pharetra, dui mi dignissim tortor, sit amet condimentum mi ligula sit amet augue. Pellentesque vitae eros eget enim mollis placerat.</p>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <p>Mauris tempus erat laoreet turpis lobortis, eu tincidunt erat fermentum.</p>
                                            <p>Aliquam non tincidunt urna. Integer tincidunt nec nisl vitae ullamcorper. Proin sed ultrices erat. Praesent varius ultrices massa at faucibus. Aenean dignissim, orci sed faucibus pharetra, dui mi dignissim tortor, sit amet condimentum mi ligula sit amet augue. Pellentesque vitae eros eget enim mollis placerat.</p>
                                        </div>
                                        <div class="col-md-6">
                                            <blockquote>
                                                <p>Pellentesque sodales augue eget ultricies ultricies. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur sagittis ultrices condimentum.</p>
                                                <p>Pellentesque ullamcorper libero in enim pellentesque lobortis. Praesent ut dui ac metus iaculis scelerisque at eget metus.</p>
                                            </blockquote>
                                        </div>
                                    </div>
                                </div>
                            </article>`
export const TEMPLATE_BUYNOW= `
   <div class="buynow-contaier">
            <div class="buynow-background"
                 style="background: url('https://w.ladicdn.com/s1440x665/5a2df15137d75282d4a36bfa/9-20210405031521.jpg')"></div>
            <div class="buynow-content">
                <h2 class="buynow-headline">KỆ GẤP THÔNG MINH NHẬT BẢN</h2>
                <div class="buynow-cols">
                    <div class="buynow-col-left">
                        <div class="buynow-box">
                            <span style="font-size: 30px">ƯU ĐÃI 40%</span>
                            <ul>
                                <li><span style="font-size: 25px">Sang trọng, quý phái, hiện đại</span></li>
                                <li><span style="font-size: 25px">Sang trọng, quý phái, hiện đại</span></li>
                                <li><span style="font-size: 25px">Sang trọng, quý phái, hiện đại</span></li>
                            </ul>
                            <ul>
                                <li style="display: flex;gap: 10px">
                                    <span style="font-size: 25px">Kệ 3 tầng</span>
                                    <span style="font-size: 25px;color: #f68200;font-weight: bold">900.000đ</span>
                                    <del style="font-size: 25px">1.600.000đ</del>
                                </li>
                                <li style="display: flex;gap: 10px">
                                    <span style="font-size: 25px">Kệ 3 tầng</span>
                                    <span style="font-size: 25px;color: #f68200;font-weight: bold">900.000đ</span>
                                    <del style="font-size: 25px">1.600.000đ</del>
                                </li>
                                <li style="display: flex;gap: 10px">
                                    <span style="font-size: 25px">Kệ 3 tầng</span>
                                    <span style="font-size: 25px;color: #f68200;font-weight: bold">900.000đ</span>
                                    <del style="font-size: 25px">1.600.000đ</del>
                                </li>
                                <li style="display: flex;gap: 10px">
                                    <span style="font-size: 25px">Kệ 3 tầng</span>
                                    <span style="font-size: 25px;color: #f68200;font-weight: bold">900.000đ</span>
                                    <del style="font-size: 25px">1.600.000đ</del>
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div class="buynow-col-right">
                        <div class="buynow-box-shadow">
                            <span>Ưu đãi chỉ dành cho 100 người đăng ký sớm nhất</span>
                            <div class="buynow-flex buynow-gap">
                                <div class="buynow-ladelement">
                                    <span>Giảm tới</span>
                                    <span>40% GIÁ</span>
                                    <span>Chỉ: 990.000đ</span>
                                </div>
                                <div class="buynow-ladelement">
                                    <span>Giảm tới</span>
                                    <span>40% GIÁ</span>
                                    <span>Chỉ: 990.000đ</span>
                                </div>
                                <div class="buynow-ladelement">
                                    <span>Giảm tới</span>
                                    <span>40% GIÁ</span>
                                    <span>Chỉ: 990.000đ</span>
                                </div>
                            </div>
                            <div class="buynow-form">
                                <input field="fullname" class="form-control border-primary pl-3" placeholder="Họ và tên">
                                <input field="phone" class="form-control border-primary pl-3" placeholder="Số điện thoại">
                                <select id="provinces" name="provinces" field="province" class="form-control"
                                            data-live-search="true" title="Chọn tỉnh/TP">
                                            <option value="123112">123123</option>
                                </select>
                                
                                <select id="dictricts" name="dictrict" field="dictrict" class="form-control"
                                            data-live-search="true" title="Chọn quận huyện">
                                </select>
                                <select id="wards" name="ward" field="ward" class="form-control"
                                            data-live-search="true" title="Chọn phường/xã">
                                </select>
                                <div class="form-group"> 
                                    <input type="text" field="address" class="form-control border-primary pl-3"
                                           name="address" placeholder="Địa chỉ">
                                </div>
                                <select id="variants" name="variants" field="variantId" class="form-control variants"
                                            data-live-search="true" title="Phân loại">
                                </select>
                            </div>

                        </div>
                        <div>
                            <div class="buynow-notification"></div>
                            <button class="buynow-button">Mua ngay|Miễn phí giao hàng</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
`
export const TEMPLATE_SUMMARY_PRODUCT = `
<div style="background-color: rgb(254, 251, 251)">
                    <div style="padding:10px;display: flex;justify-content: space-between;gap: 10px;align-items: center;background-color: rgba(196,196,196,0.31);box-shadow: 1px 18px 26px 5px rgba(0,0,0,0.4);">
                        <del>1.650.000đ</del>
                        <span style="font-size: 20px;color: #ff0000;font-weight: bold">990.000đ</span>
                        <span style="padding: 10px;border-radius: 10px;background-color: #f10000;color: #fff;font-weight: bold">Giảm 40%</span>
                    </div>
                    <div style="padding: 20px">
                        <p style="font-size: 30px;margin-top: 20px;color: #000;text-align: center;font-weight: bold">THÔNG SỐ CƠ BẢN</p>
                        <div style="display: flex;align-items: center">
                            <div style="display: flex;align-items: flex-start">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" preserveAspectRatio="none" viewBox="0 0 1664 1896.0833" class="" fill="rgba(255, 1, 1, 1.0)"> <path d="M1137 1004l306-297-422-62-189-382-189 382-422 62 306 297-73 421 378-199 377 199zm527-357q0 22-26 48l-363 354 86 500q1 7 1 20 0 50-41 50-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5T301 1569q0-6 2-20l86-500L25 695Q0 668 0 647q0-37 56-46l502-73L783 73q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path> </svg>
                                <p style="font-weight: bold;margin-bottom: 0;color: #000;margin-left: 10px">Nguồn gốc xuất xứ:</p>
                            </div>
                            <div style="margin-left: 10px">
                                <span>Hàn Quốc</span>
                            </div>
                        </div>
                        <div style="display: flex;align-items: center">
                            <div style="display: flex;align-items: flex-start">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" preserveAspectRatio="none" viewBox="0 0 1664 1896.0833" class="" fill="rgba(255, 1, 1, 1.0)"> <path d="M1137 1004l306-297-422-62-189-382-189 382-422 62 306 297-73 421 378-199 377 199zm527-357q0 22-26 48l-363 354 86 500q1 7 1 20 0 50-41 50-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5T301 1569q0-6 2-20l86-500L25 695Q0 668 0 647q0-37 56-46l502-73L783 73q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path> </svg>
                                <p style="font-weight: bold;margin-bottom: 0;color: #000;margin-left: 10px">Kiểu dáng:</p>
                            </div>
                            <div style="margin-left: 10px">
                                <span>Hàn Quốc</span>
                            </div>
                        </div>
                        <div style="display: flex;align-items: flex-start">
                            <div style="display: flex;align-items: flex-start">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" preserveAspectRatio="none" viewBox="0 0 1664 1896.0833" class="" fill="rgba(255, 1, 1, 1.0)"> <path d="M1137 1004l306-297-422-62-189-382-189 382-422 62 306 297-73 421 378-199 377 199zm527-357q0 22-26 48l-363 354 86 500q1 7 1 20 0 50-41 50-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5T301 1569q0-6 2-20l86-500L25 695Q0 668 0 647q0-37 56-46l502-73L783 73q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path> </svg>
                                <p style="font-weight: bold;margin-bottom: 0;color: #000;margin-left: 10px">Kích thước:</p>
                            </div>
                            <div>
                                <div style="margin-left: 10px">
                                    <span>kệ 3 tầng: 71x34x85cm</span>
                                </div>
                                <div style="margin-left: 10px">
                                    <span>kệ 4 tầng: 71x34x125cm</span>
                                </div>
                                <div style="margin-left: 10px">
                                    <span>kệ 5 tầng: 71x34x160cm</span>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex;align-items: center">
                            <div style="display: flex;align-items: flex-start">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" preserveAspectRatio="none" viewBox="0 0 1664 1896.0833" class="" fill="rgba(255, 1, 1, 1.0)"> <path d="M1137 1004l306-297-422-62-189-382-189 382-422 62 306 297-73 421 378-199 377 199zm527-357q0 22-26 48l-363 354 86 500q1 7 1 20 0 50-41 50-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5T301 1569q0-6 2-20l86-500L25 695Q0 668 0 647q0-37 56-46l502-73L783 73q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path> </svg>
                                <p style="font-weight: bold;margin-bottom: 0;color: #000;margin-left: 10px">Khối lượng:</p>
                            </div>
                            <div style="margin-left: 10px">
                                <span>7kg - 9kg</span>
                            </div>
                        </div>
                        <div style="display: flex;align-items: center">
                            <div style="display: flex;align-items: flex-start">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" preserveAspectRatio="none" viewBox="0 0 1664 1896.0833" class="" fill="rgba(255, 1, 1, 1.0)"> <path d="M1137 1004l306-297-422-62-189-382-189 382-422 62 306 297-73 421 378-199 377 199zm527-357q0 22-26 48l-363 354 86 500q1 7 1 20 0 50-41 50-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5T301 1569q0-6 2-20l86-500L25 695Q0 668 0 647q0-37 56-46l502-73L783 73q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path> </svg>
                                <p style="font-weight: bold;margin-bottom: 0;color: #000;margin-left: 10px">Màu sắc:</p>
                            </div>
                            <div style="margin-left: 10px">
                                <span>Đen và trắng</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p style="margin-bottom: 0;font-weight: bold;color: #000">CHÍNH SÁCH BÁN HÀNG</p>
                        <div style="border-bottom: 1px solid #7e7e7e"></div>
                    </div>
                    <div style="display: flex;gap: 10px;align-items: center">
                        <img width="50px" height="30px" src="https://w.ladicdn.com/s400x350/5a2df15137d75282d4a36bfa/9d21899f3344277e34d40bfc08f60bc7-20210330041440.png">
                        <span style="font-weight: bold;font-size: 14px;color: #000">MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC NHẬN HÀNG TỪ 2-5 NGÀY KIỂM TRA HÀNG TRƯỚC KHI THANH TOÁN</span>
                    </div>
                    <div style="display: flex;justify-content: center">
                        <a href="#123" class="animated heartBeat infinite" style="padding: 10px;border-radius: 10px;background-color: #f54545;color: #000;outline: none;border: none;font-weight: bold">Mua hàng ngay</a>

                    </div>
                </div>
`
