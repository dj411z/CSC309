Include a README file with documentation for your Web site (brief explanations of how it all works). Make sure the file includes the names and student numbers of group members. 

Dennis Jiang g3jiangd 998827943 
Fady Anees g2aneesf 999088222

Controllers:
- Our site is dependent on several controllers that each have their own responsibilities.

- For example, we have admin_products, admin_orders, and admin_customers controllers that deal with the specified admin privlileges. These privileges include adding, deleting, and editing products, along with displaying and deleting customer and order information.

- We also have controllers for handling the shopping cart functionalities, and separate controllers for email and checking out.

- Our main.php controller is the first controller to be called, handling the homepage, the creation of accounts, and the logging in of accounts.

Models:
- Our controllers map nicely to the models in our application.

- Firstly, we have object and object_models for each database item required. For example, we have order.php and order_model.php; order.php is the object itself with attributes, whereas order_model.php contains functions to interact with the database in getting, deleting, and updating the orders table.

- The key model that we created is the final_order object. This object contains attributes from a mix of other objects, such as the customer's first and last names and also the order's creditcard information. We felt that this class was necessary to simplify displaying finalized order information for the admin and also the receipt for the regular user.

Views:
- Our views directory is divided into further subdirectories that contain lists / pages / forms for their respective controllers.

- We also maintain a template file to maintain a header and navigation bar on each page on our website

How it all works:
- Our website is very simple and the steps necessary from account creation -> checking out are intuitive and flow nicely.

- While our website lacks visual appeal, we have successfully completed the majority of the functionality required from the assignment page.

- There is an inexplicable error when the user clicks on the Print Receipt button after checking out. While testing, the correct window pops up but later, it has never worked. Please examine our code to see what the functionality should have been.

- There are also some issues with validating the checkout form for creditcard info. While we have written Javascript functions to check for validity, they somehow always fail so we modified the form_validation->run() if statement to always allow for checking out. This issue with Javascript may or may not be tied in with the Print Receipt js.
