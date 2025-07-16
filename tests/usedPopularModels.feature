Feature: Used Bike/Car Models in Chennai

  Scenario: Print used bike/car models in Chennai from ZigWheels
    Given I am on the ZigWheels used car page
    When I wait for the listings to appear
    Then I should see a list of popular used bike/car models in Chennai
    And I print each model name to the console
    And If no models are found, I print a warning message

  Scenario: Print upcoming Honda bikes under Four Lakhs on ZigWheels
    Given I am on the ZigWheels homepage
    When I navigate to the Upcoming Honda bikes section
    And I filter bikes under Four Lakhs
    Then I should see a list of upcoming Honda bikes under Four Lakhs
    And I print each bike name and price to the console
    And If no bikes are found  I print a warning message