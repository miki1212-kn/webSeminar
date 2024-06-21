const questionWraps = document.querySelectorAll(".quesWrap");
const questionItemWrap = document.querySelectorAll(".quesItemWrap");
console.log(questionItemWrap.nodeName);

const correctMarkHtml = `
<div class="correctMark">
  <img src="../img/correct.png" alt="正解">
</div>
`;

const incorrectMarkHtml = `
<div class="correctMark">
  <img src="../img/incorrect.png" alt="不正解">
</div>
`;

questionItemWrap.forEach((wrap, i) => {
  //nodelistの中身
  console.log(wrap.childNodes);
  wrap.childNodes.forEach((item) => {
    //不要なテキストノードとコメントノードを無視してループ
    if (item.nodeName !== "#text") {
      item.addEventListener("click", (e) => {
        const selectElementClass = e.target.className;
        if (questionWraps[i].childNodes[1].className === "correctMark") {
          return;
        }
        e.target.style.backgroundColor = "rgba(240, 125, 1, 0.8)";
        if (selectElementClass === "correct") {
          console.log("正解");
          questionWraps[i].insertAdjacentHTML("afterbegin", correctMarkHtml);
        } else {
          console.log("不正解");
          questionWraps[i].insertAdjacentHTML("afterbegin", incorrectMarkHtml);
        }
      });
    }
  });
});
