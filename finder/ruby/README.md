# AppiumFlutterFinder

Ruby finder elements for https://github.com/truongsinh/appium-flutter-driver

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'appium_flutter_finder'
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install appium_flutter_finder

## Usage


```ruby
include Appium::Flutter::Finder

@driver = ::Appium::Core.for(caps).start_driver

# Send a request to an element
element = Appium::Flutter::Element.new(
  @driver,
  finder: by_text('You have pushed the button this many times:')
)
assert element.text == 'You have pushed the button this many times:'

# Get render tree by Flutter
@driver.execute_script 'flutter:getRenderTree', {}
```
## Development

After checking out the repo, run `bin/setup` to install dependencies. Then, run `rake test` to run the tests. You can also run `bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Changelog

- 0.2.0
    - Bump ruby_lib_core version to 4+

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/truongsinh/appium-flutter-driver/tree/master/finder/ruby .
