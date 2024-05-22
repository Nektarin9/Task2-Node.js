document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
  if (event.target.dataset.type === "update") {
    let newNotea = prompt();
    if (newNotea) {
      const id = event.target.dataset.id;
      update(id, newNotea).then(() => {
        const span = event.target.nextElementSibling;
        span.textContent = newNotea;
      });
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}
async function update(id, newNotea) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      title: newNotea,
      id,
    }),
  });
}
