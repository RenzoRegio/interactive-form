# interactive-form

Additional Features for Conditional Error Messages:

All fields below validates in real-time using the "keyup" event listener.

Field: Name
Condition: If the name field is empty or contains any characters that returns the regex as false, then the error will show.
Event: Keyup
Error Message: Only use Letters, Numbers, Underscore, Hyphen

Field: Email
Condition: If the email field does not meet the regex condition, the error message will show an additional hint for properly formatting the field.
Event: Keyup
Error Message: (Example: user@blank.com)

Field: Credit Card Number
Condition: Credit Card Number field must contain only digits that range from 13 - 16 numbers (No other character)
Event: Keyup
Error Message: Numbers Only (13 - 16 digits)

Field: Zip Code
Condition: Zip Code field must contain exactly 5 numbers (No other character)
Event: Keyup
Error Message: Numbers Only (Exactly 5 digits)

Field: CVV
Condition: CVV field must contain exactly 3 numbers (No other character)
Event: Keyup
Error Message: Numbers Only (Exactly 3 digits)
