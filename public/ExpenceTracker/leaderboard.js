window.addEventListener("DOMContentLoaded", fetchuserExpenses);

const expenseDiv = document.getElementById("expense-div");

async function fetchuserExpenses(e) {
  e.preventDefault();

  let token = localStorage.getItem("token");
  let loadUserId = +localStorage.getItem("clickedUser");

  try {
    console.log(loadUserId, token);
    let response = await axios.get(
      `http://18.183.28.71:3000/expense/getInfo/${loadUserId}`,
      { headers: { Authorization: token } }
    );

    console.log(response);
    if (response.data.success) {
      response.data.data.map((data) => {
        //using array map to transform each element into a new array
        showOnScreen(data);
      });
    }
  } catch (error) {
    console.group(error);
  }
}

function showOnScreen(data) {
  let child = `<li class="list">
    <span class="expense-info"> ₹ ${data.expenseamount} - ${data.category} - ${data.description}</span>
    </li>`;

  expenseDiv.innerHTML += child;
}
