@regression
Feature: WebdriverUniversity.com - Contact Us Page
  Background: before step
    Given I navigate to webdriveruniversity homepage

  Scenario: Valid Contact Us Form Submission
    Given I navigate to webdriveruniversity homepage
    When I click on the contact us button
    And I type a first name "Ruddy"
    And I type a last name
    And I type a email address
    And I type a comment
    And I click on the submit button
    Then I should be presented with a successful contact us submission message
  @login
  Scenario: Valid Contact Us Form Submission
    Given I navigate to webdriveruniversity homepage
    When I click on the contact us button
    And I type a first name <firstParam>
    And I type a first name '<stringParam>'
    @smoke
    @ignore
    Examples:
      | firstParam | stringParam |
      | test       | test        |
      | test2      | test2       |
