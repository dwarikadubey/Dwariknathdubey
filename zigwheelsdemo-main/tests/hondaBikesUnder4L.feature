Feature: Upcoming Honda Bikes Under ₹4 Lakhs

  Scenario: Print upcoming Honda bikes under ₹4 Lakhs on ZigWheels
    Given I am on the ZigWheels homepage
    When I navigate to the Upcoming Honda bikes section
    And I filter bikes under ₹4 Lakhs
    Then I should see a list of upcoming Honda bikes under ₹4 Lakhs
    And I print each bike name and price to the console
    And If no bikes are found, I print a warning message
