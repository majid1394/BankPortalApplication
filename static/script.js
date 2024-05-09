async function changeStatus(input) {
    var id=input.split(' ')[1]
    var currentStatus=input.split(' ')[0]
  try {
    const response = await fetch(`/changeStatuss/${id}/${currentStatus}`, { method: 'UPDATE' });

    if (response.status === 200) {
        if (currentStatus === "active")
        {
            // Find the element with the class "status active"
            // var element = document.querySelector('.status.active');
            var element=document.getElementById( currentStatus +" " +id )

             // id="active {{ account.account_number }}"
            // var content = element.innerHTML;
            element.innerHTML="disabled";
            // Change the class attribute value to "status disabled"
            element.classList.remove('active');
            element.classList.add('disabled');
            element.id="disabled" +" " +id
            }
        if (currentStatus === "disabled")
        {
            // Find the element with the class "status active"
            var element=document.getElementById( currentStatus +" " +id )
            // var content = element.innerHTML;
            element.innerHTML="active";
            // Change the class attribute value to "status disabled"
            element.classList.remove('disabled');
            element.classList.add('active');
            element.id="active" +" " +id
            }

    } else {
      console.error('Error calling /signup route. Status:', response.status);
      const errorMessage = await response.text();
      console.error('Error message:', errorMessage);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}



async function deleteUserButton(id) {
  try {
    const response = await fetch(`/deleteUserButton/${id}`, { method: 'DELETE' });
    if (response.status === 200) {
      window.location.href = '/adminController';
    } else {
      console.error('Error calling /signup route. Status:', response.status);
      const errorMessage = await response.text();
      console.error('Error message:', errorMessage);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

function getData() {
            var selectElement = document.getElementById("cars");
            var selectedCar = selectElement.options[selectElement.selectedIndex].text;
            document.getElementById("selectedCar").innerText = "Selected Car: " + selectedCar;
        }
function create_customer_submitForm() {
  var name = document.getElementById("name").value;
  var family = document.getElementById("family").value;
  var national_code = document.getElementById("national_code").value;
  var sex = document.getElementById("sex").value;
  var birthday = document.getElementById("birthday").value;
  var address = document.getElementById("address").value;
  var phone = document.getElementById("phone").value;
  // Create a new XMLHttpRequest object
  var url = 'http://localhost:5000/create_customer'
  var data = {
        'name': name,
        'family': family,
        'national_code':national_code,
        'sex':sex,
        'birthday':birthday,
        'address':address,
        'phone':phone
};
// Convert the data object to a JSON string
  var jsonData = JSON.stringify(data);
  $.ajax({
        url:url,
        type: "POST",
        contentType: 'application/json',
        data: jsonData,
        success: function (response)
        {
            if (response === "Customer already exists")
            {
                console.log("Customer already exists");
                  document.getElementById("success_message").style.display = "none";
                document.getElementById("message").style.display = "block";
                document.getElementById("message").innerText = response;
            }
            else if (response === "time data '' does not match format '%Y-%m-%d'")
            {
                console.log("time data '' does not match format '%Y-%m-%d'");


                document.getElementById("success_message").style.display = "none";
                document.getElementById("message").style.display = "block";
                document.getElementById("message").innerText = response;
            }
            else
                {
                console.log("Customer created successfully");
                document.getElementById("message").style.display = "none";
                document.getElementById("success_message").style.display = "block";
                document.getElementById("success_message").innerText = "Customer created successfully";

                // closePopup();
                }
         },
            error: function(xhr, status, error)
            {
                console.error(error);
            }
    });
 }

 async function searchCustomerInfo()
 {
     var national_code = document.getElementById("SSN").value;
     // var json_national_code = JSON.stringify(national_code);

     $.ajax({
        url:`/searchCutomerSSN/${national_code}`,
        type: `GET`,
        contentType: 'application/json',
        //data: jsonData,
        success: function (response)
        {
            if (response === "Customer Not exists")
            {
                console.log("Customer Not exists");

                document.getElementById("Search_customer_message").innerText = response;
            }
            else if (response.customer_national_code===national_code)
            {
                console.log("search successfully done and found customer");
                // Get the HTML element where you want to display the data
              /*  const dataContainer = document.getElementById("dataContainer");*/

                document.getElementById("customer_id").innerHTML="<Strong>ID: </Strong> "+response.customer_id;
                document.getElementById("customer_name").innerHTML="<Strong>Name: </Strong>"+response.customer_name;
                document.getElementById("customer_family").innerHTML="<Strong>Family: </Strong>"+response.customer_family;
                document.getElementById("customer_phone").innerHTML="<Strong>Phone: </Strong>"+response.customer_phone;
                document.getElementById("customer_address").innerHTML="<Strong>Address: </Strong>"+response.customer_address;
                document.getElementById("customer_sex").innerHTML="<Strong>Sex: </Strong>"+response.customer_sex;
                document.getElementById("customer_birthday").innerHTML="<Strong>Birthday: </Strong>"+response.customer_birthday;




                dataContainer.innerHTML = `<ul>${response.map(item => `<li>${item}</li>`).join('')}</ul>`;
              }
         },
            error: function(xhr, status, error)
            {
                console.error(error);
            }
    });
}




 function submitAccountCreateForm() {
  var national_code = document.getElementById("nationalCode").value;
  var accountType = document.getElementById("accountType").value;

  var url = 'http://localhost:5000/create_account'
  var data = {
        'national_code': national_code,
        'accountType': accountType,
};
// Convert the data object to a JSON string
  var jsonData = JSON.stringify(data);
  $.ajax({
        url:url,
        type: "POST",
        contentType: 'application/json',
        data: jsonData,
        success: function (response)
        {
            if (response === "Customer Not exists, Please first create Customer")
            {
                console.log("Customer Not exists, Please first create Customer");
                document.getElementById("success_account_created_message").innerText = " ";
                document.getElementById("error_create_account_message").innerText = response;
            }
            else
                {
                console.log("Account created successfully");
                document.getElementById("error_create_account_message").innerText = "";
                document.getElementById("success_account_created_message").innerText = "Account created successfully";
                // closeCreatedAccountPopup();
                }
         },
            error: function(xhr, status, error)
            {
                console.error(error);
            }
    });
 }



/*function openPopup() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("popup").style.display = "block";
}
function CreateAccountOpenPopup() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("create-account-container").style.display = "block";
}*/
function createAccount() {
  document.querySelector(".Account_Owner-area-wrapper").style.display = "none";
  document.querySelector(".list").classList.remove("active");
  document.querySelector(".grid").classList.remove("active");
  document.querySelector(".Account_Owner-area-wrapper").classList.remove("gridView");
  document.querySelector(".Account_Owner-area-wrapper").classList.remove("tableView");
  document.getElementById("overlay").style.display = "block";
  document.getElementById("create-account-container").style.display = "block";
}
function getBirthday() {
            var birthday = document.getElementById("birthday").value;
            alert("Selected Birthday: " + birthday);
        }
// function closePopup() {
//   document.getElementById("overlay").style.display = "none";
//   document.getElementById("popup").style.display = "none";
// }
// function closeCreatedAccountPopup() {
//   document.getElementById("overlay").style.display = "none";
//   document.getElementById("create-account-container").style.display = "none";
// }



document.querySelectorAll('.sidebar-list-item').forEach(item => {
    item.addEventListener('click', () => {
        // Remove 'myclass-active' from all elements
        document.querySelectorAll('.sidebar-list-item').forEach(item => {
            item.classList.remove('active');
        });
        if (item.id === "create_customer")
        {
             document.querySelectorAll('.app-content').forEach(item => {
                item.style.display= "none"
                })
            document.querySelectorAll('.deposit-container').forEach(item => {
                item.style.display= "none"
                })
            document.querySelectorAll('.withdraw-container').forEach(item => {
                item.style.display= "none"
                })
            document.querySelectorAll('.create-account-container').forEach(item => {
                    item.style.display= "none"
                })
            document.querySelectorAll('.create-customer-container').forEach(item => {
                    item.style.display= "block"
                })
               item.classList.add('active');
                    document.getElementById("create-account-container").style.display = "none";
                    document.getElementById("deposit-container").style.display = "none";
                    document.getElementById("withdraw-container").style.display = "none";
                    document.getElementById("create-customer-container").style.display = "block";
                    document.getElementById("account-overlay").style.display = "none";
                    document.getElementById("account-popup").style.display = "none";

                    document.getElementById("overlay").style.display = "block";
                    document.getElementById("popup").style.display = "block";
            }
        if (item.id === "Account_Owner")
        {
             document.querySelectorAll('.create-customer-container').forEach(item => {
                item.style.display= "none"
                })
            document.querySelectorAll('.deposit-container').forEach(item => {
                item.style.display= "none"
                })
            document.querySelectorAll('.withdraw-container').forEach(item => {
                item.style.display= "none"
                })
            document.querySelectorAll('.create-account-container').forEach(item => {
                    item.style.display= "none"
                })
            document.querySelectorAll('.app-content').forEach(item => {
                    item.style.display= "flex"
                })


        // Add 'myclass-active' to the clicked element
         item.classList.add('active');
            document.getElementById("create-account-container").style.display = "none";
            document.getElementById("deposit-container").style.display = "none";
            document.getElementById("withdraw-container").style.display = "none";
            document.getElementById("create-customer-container").style.display = "none";
            document.getElementById("account-overlay").style.display = "none";
            document.getElementById("account-popup").style.display = "none";

            document.getElementById("overlay").style.display = "none";
            document.getElementById("popup").style.display = "none";
            {
        //     fetch('/refresh_site', {
        //         method: 'GET'
        //     }).then(function(response) {
        //         if (response.ok) {
        //             // Redirect to the /signup route

        //         } else {
        //             console.error('Error calling /signup route');
        //         };
        // });
}


        }
        if (item.id === "create_account")
        {
             document.querySelectorAll('.create-customer-container').forEach(item => {
                item.style.display= "none"
                })
            document.querySelectorAll('.app-content').forEach(item => {
                    item.style.display= "none"
                })
            document.querySelectorAll('.deposit-container').forEach(item => {
                    item.style.display= "none"
                })
            document.querySelectorAll('.withdraw-container').forEach(item => {
                    item.style.display= "none"
                })
            document.querySelectorAll('.create-account-container').forEach(item => {
                    item.style.display= "block"
                })

        // Add 'myclass-active' to the clicked element
         item.classList.add('active');
         document.getElementById("create-customer-container").style.display = "none";
         document.getElementById("deposit-container").style.display = "none";
         document.getElementById("withdraw-container").style.display = "none";
         document.getElementById("overlay").style.display = "none";
         document.getElementById("popup").style.display = "none";

         document.getElementById("account-overlay").style.display = "block";
         document.getElementById("account-popup").style.display = "block";

         document.getElementById("create-account-container").style.display = "block";

        }
         if (item.id === "deposit")
        {
             document.querySelectorAll('.create-customer-container').forEach(item => {
                item.style.display= "none"
                })
            document.querySelectorAll('.app-content').forEach(item => {
                    item.style.display= "none"
                })
            document.querySelectorAll('.createAccount-MyContainer').forEach(item => {
                    item.style.display= "none"
                })
            document.querySelectorAll('.withdraw-container').forEach(item => {
                    item.style.display= "none"
                })
            document.querySelectorAll('.deposit-container').forEach(item => {
                    item.style.display= "block"
                })



        // Add 'myclass-active' to the clicked element
         item.classList.add('active');

         document.getElementById("create-customer-container").style.display = "none";
         document.getElementById("create-account-container").style.display = "none";
         document.getElementById("withdraw-container").style.display = "none";
         document.getElementById("overlay").style.display = "none";
         document.getElementById("popup").style.display = "none";
         document.getElementById("account-overlay").style.display = "none";
         document.getElementById("account-popup").style.display = "none";

         document.getElementById("deposit-container").style.display = "block";
        }
    if (item.id === "withdraw")
        {
             document.querySelectorAll('.create-customer-container').forEach(item => {
                item.style.display= "none"
                })
            document.querySelectorAll('.app-content').forEach(item => {
                    item.style.display= "none"
                })
            document.querySelectorAll('.createAccount-MyContainer').forEach(item => {
                    item.style.display= "none"
                })
            document.querySelectorAll('.withdraw-container').forEach(item => {
                    item.style.display= "none"
                })
            document.querySelectorAll('.deposit-container').forEach(item => {
                    item.style.display= "none"
                })
            document.querySelectorAll('.withdraw-container').forEach(item => {
                    item.style.display= "block"
                })


        // Add 'myclass-active' to the clicked element
         item.classList.add('active');

         document.getElementById("create-customer-container").style.display = "none";
         document.getElementById("create-account-container").style.display = "none";
         document.getElementById("overlay").style.display = "none";
         document.getElementById("popup").style.display = "none";
         document.getElementById("account-overlay").style.display = "none";
         document.getElementById("account-popup").style.display = "none";
         document.getElementById("deposit-container").style.display = "none";
         document.getElementById("withdraw-container").style.display = "block";
        }
    });
 });
//   var elements = document.getElementsByClassName("app-content-actions" );
//         for (var i = 0; i < elements.length; i++) {
//             elements[i].style.display = "none";
//         }
//         var elements = document.getElementsByClassName("app-content-headerButton" );
//         for (var i = 0; i < elements.length; i++) {
//             elements[i].style.display = "none";
//         }
//         var elements = document.getElementsByClassName("app-content-headerText" );
//         for (var i = 0; i < elements.length; i++) {
//             elements[i].style.display = "none";
//         }
//   var elements = document.getElementsByClassName("Account_Owner-area-wrapper tableView" );
//     for (var i = 0; i < elements.length; i++) {
//         elements[i].style.display = "none";
//
//
//         document.getElementById("create-customer-container").style.display = "block";
//         // document.getElementById("overlay").style.display = "block";
//         // document.getElementById("popup").style.display = "block";
// //    var elements = document.getElementsByClassName("create-customer-container");
// //         for (var i = 0; i < elements.length; i++) {
// //             elements[i].style.display = "block";
// // }
//
// }
// }

//     var elements = document.getElementsByClassName("create-customer-container");
//     for (var i = 0; i < elements.length; i++) {
//         elements[i].style.display = "none";
// }



function all_accounts() {
    document.querySelectorAll('.sidebar-list-item').forEach(item => {
    item.addEventListener('click', () => {
        // Remove 'myclass-active' from all elements
        document.querySelectorAll('.sidebar-list-item').forEach(item => {
            item.classList.remove('active');
        });

        // Add 'myclass-active' to the clicked element
        item.classList.add('active');
    });
});
   document.getElementById("create-customer-container").style.display = "none";
   // document.getElementById("overlay").style.display = "none";
   // document.getElementById("popup").style.display = "none";

  var elements = document.getElementsByClassName("app-content");
    for (var i = 0; i < elements.length; i++)
        elements[i].style.display = "block";
  var elements = document.getElementsByClassName("app-content-actions" );
        for (var i = 0; i < elements.length; i++)
            elements[i].style.display = "flex";
  var elements = document.getElementsByClassName("app-content-headerButton" );
        for (var i = 0; i < elements.length; i++)
            elements[i].style.display = "block";
   var elements = document.getElementsByClassName("app-content-headerText" );
        for (var i = 0; i < elements.length; i++)
            elements[i].style.display = "block";
  var elements = document.getElementsByClassName("Account_Owner-area-wrapper tableView" );
    for (var i = 0; i < elements.length; i++)
        elements[i].style.display = "block";
    }
document.querySelector(".jsFilter").addEventListener("click", function () {
  document.querySelector(".filter-menu").classList.toggle("active");
});

document.querySelector(".grid").addEventListener("click", function () {
  document.querySelector(".Account_Owner-area-wrapper").style.display = "flex";
  document.querySelector(".list").classList.remove("active");
  document.querySelector(".grid").classList.add("active");
  document.querySelector(".Account_Owner-area-wrapper").classList.add("gridView");
  document.querySelector(".Account_Owner-area-wrapper").classList.remove("tableView");
  const rows = document.querySelectorAll('.Account_Owner-row');
  rows.forEach(row => {
      if (row.style.display != 'none')
      {
         row.style.display="block"
        }
});
  // document.querySelector(".Account_Owner-row").style.display = "block";
//   const rows = document.querySelectorAll('.Account_Owner-row');
//   rows.forEach(row => {
//     if (row.style.display = 'flex')
//       {  row.style.display = 'block';  }
// });
});
document.querySelector(".list").addEventListener("click", function () {document.querySelector(".Account_Owner-area-wrapper").style.display = "block";
  document.querySelector(".list").classList.add("active");
  document.querySelector(".grid").classList.remove("active");
  document.querySelector(".Account_Owner-area-wrapper").classList.remove("gridView");
  document.querySelector(".Account_Owner-area-wrapper").classList.add("tableView");

   const rows = document.querySelectorAll('.Account_Owner-row');
  rows.forEach(row => {
      if (row.style.display != 'none')
      {
         row.style.display="flex"
        }
});
   // document.querySelector(".Account_Owner-row").style.display = "flex";
//    const rows = document.querySelectorAll('.Account_Owner-row');
//   rows.forEach(row => {
//     if (row.style.display = 'block')
//     { row.style.display = 'flex'; }
// });

});
// document.querySelector(".list").addEventListener("click", function () {
//     document.querySelector(".Account_Owner-area-wrapper").style.display = "block";
//   document.querySelector(".list").classList.add("active");
//   document.querySelector(".grid").classList.remove("active");
//   document.querySelector(".Account_Owner-area-wrapper").classList.remove("gridView");
//   document.querySelector(".Account_Owner-area-wrapper").classList.add("tableView");
// });

var modeSwitch = document.querySelector('.mode-switch');
modeSwitch.addEventListener('click', function () {
 document.documentElement.classList.toggle('light');
 modeSwitch.classList.toggle('active');
});

function signupButton(){
            fetch('/signup', {
                method: 'POST'
            }).then(function(response) {
                if (response.ok) {
                    // Redirect to the /signup route
                    window.location.href = '/signup';
                } else {
                    console.error('Error calling /signup route');
                };
        });
}


const searchInput = document.getElementById('searchInput');
// const productCells = document.querySelectorAll('.product-cell');
searchInput.addEventListener('input', function() {
    var inputComes=''
   var buttons = document.querySelectorAll('.action-button');
   buttons.forEach(function(button) {
                if (button.classList.contains('active')) {
                    console.log(button.title + ' button is currently active.');
                    inputComes =button.title
                }
            });
  const searchTerm = searchInput.value.toLowerCase();
// Get all the product cells to search through
  const accountCells = document.querySelectorAll('.Account_Number');

  accountCells.forEach(cell => {
  const rows = document.querySelectorAll('.Account_Owner-row');
  rows.forEach(row => {
    let rowMatch = false;
    row.querySelectorAll('.Account_Number, .National_Code').forEach(cell => {
      if (cell.textContent.toLowerCase().includes(searchTerm)) {
        rowMatch = true;
      }
    });

    if (rowMatch){
        if  (inputComes==="Grid View")
            row.style.display = 'block';
        else if  (inputComes==="List View")
                row.style.display = 'flex'
            }
    else
        row.style.display = 'none';
    //
    //     if ( searchTerm==='')
    //         row.style.display = 'block'
    //     else
    //          {row.style.display = 'none';}
    //     }
    // else
    //  {
    //     if  (inputComes==="Grid View")
    //        row.style.display = 'block';
    //    else
    //    {
    //        if (inputComes==="List View")
    //          row.style.display = 'flex';
    //     }



  });
});
});
document.querySelectorAll('.payment-entity').forEach(function(element) {
    element.addEventListener('click', function() {
        // Set active class
        document.querySelectorAll('.payment-selection .payment-entity').forEach(function(el) {
            el.classList.remove('selected');
        });
        this.classList.add('selected');

        // Show correct info
        document.querySelectorAll('.provider-section').forEach(function(section) {
            section.classList.add('hide');
        });
        document.querySelector('.' + this.getAttribute('data-payment')).classList.remove('hide');
    });
});
// start deposit script
// $('.payment-entity').on('click', function() {
//   // Set active class
//   $('.payment-selection .payment-entity').removeClass('selected');
//   $(this).addClass('selected');
//
//   // Show correct info
//   $('.provider-section').addClass('hide');
//   $('.' + $(this).data('payment')).removeClass('hide');
// });
//end deposit script
function deposit(){
 var amount = document.getElementById("amount").value;
 var account_number = document.getElementById("destination_account_number").value;
 var url = 'http://localhost:5000/deposit'
 var data = {
        'amount': amount,
        'account_number': account_number
};
// Convert the data object to a JSON string
  var jsonData = JSON.stringify(data);
  $.ajax({
        url:url,
        type: "POST",
        contentType: 'application/json',
        data: jsonData,
        success: function (response)
        {
            if (response === "destination account disabled or not found")
            {
                console.log("destination account disabled or not found");
                document.getElementById("success_deposit_message").innerText = " ";
                document.getElementById("error_deposit_message").innerText = " ";
                document.getElementById("error_deposit_message").innerText = response;
            }
            else
                {
                console.log("done");
                document.getElementById("success_deposit_message").innerText = " ";
                document.getElementById("success_deposit_message").innerText = "Deposit done successfully";
               //  document.getElementById("amount").value= " ";
               // document.getElementById("destination_account_number").value= " ";

                // closePopup();
                }
         },
            error: function(xhr, status, error)
            {
                console.error(error);
            }
    });
}

function withdraw(){
 var amount = document.getElementById("withdraw_amount").value;
 var account_number = document.getElementById("withdraw_account_number").value;
 var url = 'http://localhost:5000/withdraw'
 var data = {
        'amount': amount,
        'account_number': account_number
};
// Convert the data object to a JSON string
  var jsonData = JSON.stringify(data);
  $.ajax({
        url:url,
        type: "POST",
        contentType: 'application/json',
        data: jsonData,
        success: function (response)
        {
            if (response === "source account not found or Not enough Money to withdraw")
            {
                console.log("source account not found or Not enough Money to withdraw");
                document.getElementById("success_withdraw_message").innerText = " ";
                document.getElementById("error_withdraw_message").innerText = " ";
                document.getElementById("error_withdraw_message").innerText = response;
            }
            else if (response === "done")
                {
                console.log("done");
                document.getElementById("error_withdraw_message").innerText = " ";
                document.getElementById("success_withdraw_message").innerText = "";
                document.getElementById("success_withdraw_message").innerText = "withdraw done successfully";
                document.getElementById("withdraw_amount").value= "";
                document.getElementById("withdraw_account_number").value= "";

                }
         },
            error: function(xhr, status, error)
            {
                console.error(error);
            }
    });
}