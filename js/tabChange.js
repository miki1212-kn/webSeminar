//   const tablists = document.querySelectorAll(".tablist");
//   const tabcontents = document.querySelectorAll(".tabcontents");

//   // activeを削除する
//   function removeActiveClass() {
//     // tablistsの要素すべてに対して、activeを削除する
//     tablists.forEach((tablist) => tablist.classList.remove("active"));
//     // tabcontentsの要素すべてに対して、activeを削除する
//     tabcontents.forEach((tabcontent) => tabcontent.classList.remove("active"));
//   }

//   // activeを追加する
//   function addActiveClass(index) {
//     // 指定されたindexのtablistにactiveを追加する
//     tablists[index].classList.add("active");
//     // 指定されたindexのtabcontentにactiveを追加する
//     tabcontents[index].classList.add("active");
//   }

//   // tablistsの要素すべてに対して、クリックイベント
//   tablists.forEach((tablist, index) => {
//     tablist.addEventListener("click", () => {
//       // activeを削除する関数を呼び出す
//       removeActiveClass();
//       // クリックされたtablistのインデックスを指定して、activeを追加する関数を呼び出す
//       addActiveClass(index);
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const tablists = document.querySelectorAll(".tablist");
  const tabcontents = document.querySelectorAll(".tabcontents");

  // クリックされたときにactiveをトグルする
  function toggleActiveClass(index) {
    tablists.forEach((tablist, i) => {
      if (i === index) {
        tablist.classList.toggle("active");
      } else {
        tablist.classList.remove("active");
      }
    });
    tabcontents.forEach((tabcontent, i) => {
      if (i === index) {
        tabcontent.classList.toggle("active");
      } else {
        tabcontent.classList.remove("active");
      }
    });
  }

  // tablistsの要素すべてに対して、クリックイベント
  tablists.forEach((tablist, index) => {
    tablist.addEventListener("click", () => {
      toggleActiveClass(index);
    });
  });
});
