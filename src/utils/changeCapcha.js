export default function changeCaptcha() {
    // 换一换验证码
    let _svg = document.querySelector("#changeCaptcha svg");
    if (this.capFlag === false) {
      return;
    }
    _svg.classList.add("rotate");
    this.getCapcha();
    this.capFlag = false;
    setTimeout(() => {
      _svg.classList.remove("rotate");
      this.capFlag = true;
    }, 1000);
}
