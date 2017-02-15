 <?php

    // Your Email Address
    $youremail = "example@mail.com";

    // Register Form
     if (isset($_POST['email']) || isset($_POST['tel'])) {

        // Detect & Prevent Header Injections
        $test = "/(content-type|bcc:|cc:|to:)/i";
        foreach ( $_POST as $key => $val ) {
            if ( preg_match( $test, $val ) ) {
                exit;
            }
        }
      }

        // Email Format
        $body  =    "Новая заявка от клиента \n\n";
        $body .=    "========== \n\n";
        $body .=    "Имя:  $_POST[name] \n\n";
        $body .=    "Email:  $_POST[email] \n\n";
        $body .=    "Tel:  $_POST[tel] \n\n";


        //Send email
        mail( $youremail, "Новая заявка от клиента", $body, "From:" . $_POST['email'] );

		// Email to register user
        $userbody  =    "$_POST[name], спасибо за заявку! \n\n";
        mail($_POST['email'], "Спасибо за заявку", $userbody, "From:" . $youremail );
?>
