"use client";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import styles from "./page.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Countdown from "react-countdown";
import { useEffect, useRef } from "react";
import Modal from "react-modal";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { fakeNew } from "@/uititiles/fakeNews";
import emailjs from "@emailjs/browser";
import { FaHome, FaPhoneAlt } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import Comments from "@/components/comments";
const schema = yup
  .object({
    name: yup.string(),
    phone: yup
      .string()
      .required()
      .matches(
        /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/,
        "Số điện thoại không đúng định dạng"
      ),
    comment: yup.string(),
  })
  .required();
const renderer_count_down = ({ days, hours, minutes, seconds, completed }) => {
  return (
    <div className={styles.count_down_block}>
      <div className={styles.count_down_item}>
        <p>0{days}</p>
        <h6>Days</h6>
      </div>
      <div className={styles.count_down_item}>
        <p>{hours}</p>
        <h6>Hours</h6>
      </div>
      <div className={styles.count_down_item}>
        <p>{minutes}</p>
        <h6>Min</h6>
      </div>
      <div className={styles.count_down_item}>
        <p>{seconds}</p>
        <h6>Sec</h6>
      </div>
    </div>
  );
};
export default function Home() {
  const myRef = useRef(null);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const createNotification = () => {
    const index = Math.floor(Math.random() * fakeNew.length);
    toast(
      <div className={styles.toasty}>
        <div className={styles.toasty_icon}>
          <div className={styles.toasty_circle}></div>
        </div>
        <div className={styles.toasty_content}>
          <p className={styles.toasty_title}>{fakeNew[index].phone}</p>
          <p className={styles.toasty_item}>{fakeNew[index].content}</p>
          <p className={styles.toasty_item}>{fakeNew[index].time}</p>
        </div>
      </div>
    );
  };
  useEffect(() => {
    const timer = setInterval(() => createNotification(), 15000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    emailjs
      .send(
        "service_vxh6gbr",
        "template_vlkptwn",
        {
          name: data.name,
          phone: data.phone,
          address: data.address,
        },
        "GAKnrx8iiEtv58CiL"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
    setIsOpen(true);
  };
  const settings = {
    customPaging: function (i) {
      return (
        <div className={styles.slide_paging}>
          <img src={`images/slide-${i + 1}.jpeg`} />
        </div>
      );
    },
    dots: true,
    infinite: true,
    dotsClass: "slick-dots-custom slick-thumb",
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src="images/logo.png" />
        </div>
        <div
          className={styles.btn_buy_now}
          onClick={() => {
            myRef.current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Đăng kí mua ngay
        </div>
      </div>
      <div className={styles.banner}>
        <div className={styles.slogan}>
          <p>Điều Hoà Thông Minh</p>
          <span>Thiết kế nhỏ gọn làm lạnh nhanh</span>
        </div>
        <div className={styles.banner_img}>
          <img src="images/product.png" />
        </div>
        <div className={styles.banner_price}>
          <div
            className={styles.btn_buy_now}
            style={{ height: 50 }}
            onClick={() => {
              myRef.current.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Đăng kí mua ngay
          </div>
          <div className={styles.banner_price_only}>
            <p>Giá chỉ</p>
            <h3>3.489.000đ</h3>
          </div>
        </div>
      </div>
      <div className={styles.adve}>
        <h3>Điều Hoà Mini Chất Lượng Cao</h3>
        <p>Làm lạnh nhanh tích kiệm điện</p>
      </div>
      <div className={styles.slide}>
        <Slider {...settings}>
          <div className={styles.home_slide_item}>
            <img alt="" src="images/slide-1.jpeg" />
          </div>
          <div className={styles.home_slide_item}>
            <img alt="" src="images/slide-2.jpeg" />
          </div>
          <div className={styles.home_slide_item}>
            <img alt="" src="images/slide-3.jpeg" />
          </div>
          <div className={styles.home_slide_item}>
            <img alt="" src="images/slide-4.jpeg" />
          </div>
        </Slider>
      </div>
      <div className={styles.paragraph}>
        <p>
          Được gia mắt vào đầu năm 2020 và ngay lập tức đã làm mưa gió trên thị
          trường. Đây là dòng sản phẩm rất Smart sẽ giúp bạn khắc phục tình
          trạng sạc không đủ điện ở các thiết bị di động giúp sạc đầy viên pin
          khổng lồ chỉ trong một thời gian ngắn.
        </p>
      </div>
      <div className={styles.promotion}>
        <p className={styles.promotion_discount}>Ưu đãi giảm giá</p>
        <p className={styles.promotion_old_price}>5.450.000đ</p>
      </div>
      <div className={styles.flash_sale}>
        <p className={styles.flash_sale_new_price}>3.450.000đ</p>
        <div className={styles.flash_sale_line}></div>
        <Countdown
          date={Date.now() + 1000 * 60 * 60 * 2 + 1000 * 60 * 26}
          renderer={renderer_count_down}
        />
      </div>
      <div ref={myRef}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.login_form}>
          <div className={styles.login_form_title}>Đặt hàng ngay tại đây</div>
          <div className={styles.form_item}>
            <input
              className={styles.input_form}
              {...register("name")}
              placeholder="Họ Tên"
              autoComplete="do-not-autofill"
            />
            <p>{errors.name?.message}</p>
          </div>
          <div className={styles.form_item}>
            <input
              className={styles.input_form}
              {...register("phone")}
              placeholder="Số điện thoại"
              autoComplete="do-not-autofill"
            />
            <p>{errors.phone?.message}</p>
          </div>
          <div className={styles.form_item}>
            <textarea
              className={styles.textarea_form}
              rows={5}
              {...register("comment")}
              placeholder="Phản hồi tới nhà phân phối"
            />
            <p>{errors.address?.message}</p>
          </div>
          <div className={styles.form_submit}>
            <button className={styles.btn_buy_now} type="submit">
              Đặt Hàng Ngay
            </button>
          </div>
        </form>
      </div>
      <div className={styles.post}>
        <div className={styles.post_content}>
          <p>Công nghệ hút ẩm</p>
          <h6>
            Tự động phát hiện độ ẩm của phòng theo thời gian thực, máy sẽ ngừng
            hút ẩm khi đạt đến độ ẩm đã cài đặt. Nếu độ ẩm tăng lên cao hơn mức
            đó, máy sẽ tự động khởi động quá trình hút ẩm, giúp hạn chế nấm mốc,
            bảo vệ sức khỏe các thành viên trong gia đình bạn.
          </h6>
        </div>
        <div className={styles.post_img}>
          <img src="images/hut-am.jpeg" />
        </div>
      </div>
      <div className={styles.product_detail}>
        <div className={styles.product_block}>
          <div className={styles.product_detail_title}>CHI TIẾT SẢN PHẨM</div>
          <div className={styles.product_detail_item}>
            <p>Danh mục</p> <p>Phụ kiện điện tử</p>
          </div>
          <div className={styles.product_detail_item}>
            <p>Chất liệu</p> <p>Hợp kim nhôm</p>
          </div>
          <div className={styles.product_detail_item}>
            <p>Xuất xứ</p> <p>Việt Nam</p>
          </div>
        </div>
        <div className={styles.product_block}>
          <div className={styles.product_detail_title}>MÔ TẢ SẢN PHẨM</div>
          <div className={styles.product_detail_item}>
            <b>Dung lượng</b>: 230 mAh
          </div>
          <div className={styles.product_detail_item}>
            <b>Bộ nhớ</b>: 64M+128M
          </div>
          <div className={styles.product_detail_item}>
            <b>Kích thước màn hình</b>: 1.54 inch
          </div>
          <div className={styles.product_detail_item}>
            <b>Màu sắc</b>: Đen, Trắng Bạc, Xám Đen, Hồng
          </div>
        </div>
      </div>
      <div className={styles.post}>
        <div className={styles.post_content}>
          <p>Tạo ion âm, ngăn ngừa virus nấm và vi khuẩn có hại</p>
          <h6>
            Có thể chúng ta chưa biết, độ ẩm cao ảnh hưởng đến sức khỏe con
            người rất nhiều. Nếu như, độ ẩm cao trên 70% sẽ là môi trường lý
            tưởng để các loại nấm mốc, vi khuẩn, vi rút sinh sôi, nảy nở, thậm
            chí là các loại loại bọ bụi nhà. Từ đó con người sẽ bị các bệnh như
            như dị ứng da, viêm mũi, hen suyễn, đau mắt, viêm đường hô hấp...
          </h6>
        </div>
        <div className={styles.post_img}>
          <img src="images/ion.jpeg" />
        </div>
      </div>
      <div className={styles.post}>
        <div className={styles.post_img}>
          <img src="images/dry.jpeg" />
        </div>
        <div className={styles.post_content}>
          <p>Làm mát nhanh chóng, hoạt đông êm ái</p>
          <h6>
            Làm mát nhanh, động cơ êm ái với độ ồn thấp , yên tĩnh đảm bảo giấc
            ngủ của bạn
          </h6>
        </div>
      </div>
      <Comments />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.login_form}>
        <div className={styles.login_form_title}>Đặt hàng ngay tại đây</div>
        <div className={styles.form_item}>
          <input
            className={styles.input_form}
            {...register("name")}
            placeholder="Họ Tên"
            autoComplete="do-not-autofill"
          />
          <p>{errors.name?.message}</p>
        </div>
        <div className={styles.form_item}>
          <input
            className={styles.input_form}
            {...register("phone")}
            placeholder="Số điện thoại"
            autoComplete="do-not-autofill"
          />
          <p>{errors.phone?.message}</p>
        </div>
        <div className={styles.form_item}>
          <textarea
            className={styles.textarea_form}
            rows={5}
            {...register("comment")}
            placeholder="Phản hồi tới nhà phân phối"
          />
          <p>{errors.address?.message}</p>
        </div>
        <div className={styles.form_submit}>
          <button className={styles.btn_buy_now} type="submit">
            Đặt Hàng Ngay
          </button>
        </div>
      </form>
      <div className={styles.footer}>
        <div className={styles.footer_bg}></div>
        <div className={styles.footer_box}>
          <div className={styles.footer_title}>
            VINFAST Klara – Đại lý uỷ quyền cấp 1
          </div>
        </div>
        <div className={styles.footer_contact}>
          <FaHome style={{ marginRight: 10, fontSize: 25 }} />
          <p>Số 39A Nguyễn Trãi, Thượng Đình, Thanh Xuân, TP Hà Nội</p>
        </div>
        <div className={styles.footer_contact}>
          <FaPhoneAlt style={{ marginRight: 10, fontSize: 20 }} />{" "}
          <p>0123 456 789</p>
        </div>
        <div className={styles.footer_contact}>
          <AiOutlineMail style={{ marginRight: 10, fontSize: 20 }} />{" "}
          <p>example@gmail.com</p>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.modal}
      >
        <div className={styles.modal_content}>
          <img src="images/success-icon.png" />
          <h6>ĐẶT HÀNG THÀNH CÔNG</h6>
          <p>
            Cám ơn quý khách đã mua hàng tại <span>namia.com.vn</span>
          </p>
          <p>
            Nhân viên chúng tôi sẽ sớm liên hệ với Quý khách trong thời gian sớm
            nhất.
          </p>
          <p>
            Nếu Quý Khách có thắc mắc, xin vui lòng liên hệ số hotline
            <span>19006969</span>.
          </p>
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
      {/* <ToastContainer
        className={styles.toast_container}
        bodyClassName={styles.toasty_body}
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        closeButton={false}
        limit={1}
      /> */}
      <div className={styles.fix_tel}>
        <a href={`tel:0356235391`}>
          <FaPhoneAlt />
        </a>
      </div>
    </div>
  );
}
