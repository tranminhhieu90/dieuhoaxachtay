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
import { AiOutlineMail, AiOutlineCheckCircle } from "react-icons/ai";
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
  const convert_days = `0${days}`.substring(0, 2);
  const convert_hours = `0${hours}`.substring(0, 2);
  const convert_minutes = `0${minutes}`.substring(0, 2);
  const convert_seconds = `0${seconds}`.substring(0, 2);
  return (
    <div className={styles.count_down_block}>
      <div className={styles.count_down_item}>
        <p>{convert_days}</p>
      </div>
      <div className={styles.count_down_item}>
        <p>{convert_hours}</p>
      </div>
      <div className={styles.count_down_item}>
        <p>{convert_minutes}</p>
      </div>
      <div className={styles.count_down_item}>
        <p>{convert_seconds}</p>
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
          className={styles.voucher}
          onClick={() => {
            myRef.current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <p>Ưu đãi lên tới</p> <span>30%</span>
        </div>
      </div>
      <div className={styles.remaining_product}>
        <p>Số lượng chỉ còn</p>
        <h3>50</h3>
        <p>sản phẩm cuối cùng</p>
      </div>

      <div className={styles.flash_sale}>
        <p className={styles.flash_sale_good_price}>GIÁ ƯU ĐÃI</p>
        <div className={styles.flash_sale_price2}>
          <p className={styles.flash_sale_old_price}>5.450.000đ</p>
          <p className={styles.flash_sale_new_price}>3.450.000đ</p>
        </div>
      </div>
      <div className={styles.count_down_title}>
        <p>Ưu đãi chỉ còn kéo dài trong</p>
      </div>
      <Countdown
        date={Date.now() + 1000 * 60 * 60 * 2 + 1000 * 60 * 26}
        renderer={renderer_count_down}
      />
      <div className={styles.slide}>
        <Slider {...settings}>
          <div className={styles.home_slide_item}>
            <img alt="" src="images/IMG_0239.JPG" />
          </div>
          <div className={styles.home_slide_item}>
            <img alt="" src="images/slide-2.jpeg" />
          </div>
          <div className={styles.home_slide_item}>
            <img alt="" src="images/slide-3.jpeg" />
          </div>
          <div className={styles.home_slide_item}>
            <img alt="" src="images/image6.jpg" />
          </div>
        </Slider>
      </div>
      <div className={styles.adve}>
        <h3>Điều Hoà Mini Chất Lượng Cao</h3>
        <p>Làm lạnh nhanh tích kiệm điện</p>
      </div>
      <div className={styles.paragraph}>
        <p>
          Được gia mắt vào đầu năm 2020 và ngay lập tức đã làm mưa gió trên thị
          trường. Đây là dòng sản phẩm rất Smart sẽ giúp bạn khắc phục tình
          trạng sạc không đủ điện ở các thiết bị di động giúp sạc đầy viên pin
          khổng lồ chỉ trong một thời gian ngắn.
        </p>
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

      <div className={styles.product_detail}>
        <div className={styles.product_block}>
          <div className={styles.product_detail_title}>CHI TIẾT SẢN PHẨM</div>
          <table className={styles.table}>
            <tr>
              <td>Mẫu mã</td>
              <td>WST-WK420A</td>
              <td>Dòng điện định mức</td>
              <td>1.34A</td>
            </tr>
            <tr>
              <td>Kiểu loại</td>
              <td>Mini/Di động</td>
              <td>Mức độ ồn</td>
              <td>≤38dB(A)</td>
            </tr>
            <tr>
              <td>Điều khiển</td>
              <td>Từ xa / Cảm ứng</td>
              <td>Gas làm lạnh</td>
              <td>R290a</td>
            </tr>
            <tr>
              <td>Chức năng</td>
              <td>Điều hòa / Quạt</td>
              <td>Kích thước máy</td>
              <td>400*300*225mm</td>
            </tr>
            <tr>
              <td>Công suất làm lạnh</td>
              <td>420W / 1,433Btu</td>
              <td>Kích thước đóng gói</td>
              <td>469*350*265mm</td>
            </tr>
            <tr>
              <td>Công suất tiêu thụ điện</td>
              <td>280W</td>
              <td>Khối lượng</td>
              <td>9kg/10kg</td>
            </tr>
            <tr>
              <td>Nguồn điện</td>
              <td>220V~50Hz/60Hz</td>
              <td>Dây cáp điện</td>
              <td>1,500mm</td>
            </tr>
          </table>
        </div>
        <div className={styles.product_block}>
          <div className={styles.product_detail_title}>TÍNH NĂNG</div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Máy nén piston hoạt động mạnh mẽ</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Làm mát nhanh</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Tùy chỉnh tốc độ quạt gió</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Gas R290a hiệu suất cao thân thiện với môi trường</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Tiết kiệm năng luợng</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Chế độ hút ẩm</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Động cơ DC không chổi than</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>{`Tiếng ồn thấp<38 dB (A)`}</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Thiết kế sang trọng phù hợp với mọi không gian</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Màn hình cảm ứng & điều khiển từ xa</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Công nghệ lọc không khí bằng ion âm độc quyền</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Cánh đảo gió điều khiển bằng tay độc quyền</b>
          </div>
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
            className={styles.btn_buy_now }
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
          <div className={styles.footer_title}>Đại lý uỷ quyền</div>
        </div>
        <div className={styles.footer_contact}>
          <FaHome  className={styles.footer_home_icon}/>
          <p>Trịnh Văn Bô, Xuân Phương, Quận Nam Từ LIêm, Hà Nội</p>
        </div>
        <div className={styles.footer_contact}>
          <FaPhoneAlt  />
          <a href={`tel:0976027317`}>0976027317</a>
        </div>
        <div className={styles.footer_contact}>
          <AiOutlineMail  />
          <a href={`mailto:dieuhoaxachtay@gmail.com`}> <p>dieuhoaxachtay@gmail.com</p></a>
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
            <span>0976027317</span>.
          </p>
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
      <ToastContainer
        className={styles.toast_container}
        bodyClassName={styles.toasty_body}
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        closeButton={false}
        limit={1}
      />
      <div className={styles.fix_tel}>
        <a href={`tel:0976027317`}>
          <FaPhoneAlt />
        </a>
      </div>
    </div>
  );
}
