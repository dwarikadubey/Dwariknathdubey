Feature: Used Bike/Car Models in Chennai

  Scenario: Print used bike/car models in Chennai from ZigWheels
    Given I am on the ZigWheels used car page
    When I wait for the listings to appear
    Then I should see a list of popular used bike/car models in Chennai
    And I print each model name to the console
    And If no models are found, I print a warning message
