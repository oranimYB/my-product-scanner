let uploadedFile = null;

document.getElementById("imageInput").onchange = function(e) {
  const file = e.target.files[0];
  if (!file) return;

  uploadedFile = file;
  const url = URL.createObjectURL(file);
  document.getElementById("preview").innerHTML = `<img src="${url}" alt="预览"/>`;
  document.getElementById("submitBtn").style.display = "block";
};

async function query() {
  if (!uploadedFile) return alert("请先上传图片");

  const formData = new FormData();
  formData.append("image", uploadedFile);

  const res = await fetch("https://你的后端域名/api/query", {
    method: "POST",
    body: formData
  });

  const data = await res.json();

  if (data.error) {
    document.getElementById("output").innerHTML = `❌ ${data.error}`;
  } else {
    document.getElementById("output").innerHTML = `
      <strong>产品代码：</strong>${data.code || '未识别'}<br/>
      <strong>产品说明：</strong>${data.description || '暂无'}<br/>
      <strong>购买链接：</strong><a href="${data.link}" target="_blank">点击购买</a>
    `;
  }

  document.getElementById("result").style.display = "block";
  document.getElementById("submitBtn").style.display = "none";
}

function resetApp() {
  location.reload();
}
