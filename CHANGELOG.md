# Changelog

All notable changes to this project will be documented in this file.

## [0.3.1] - 2025-07-03

### Fixed

- Fixed Switch memoization issue to evaluate `value` and `is` changes

## [0.3.0] - 2025-07-02

### Added

- Comprehensive documentation with detailed component guides
- Performance optimization examples and best practices
- Advanced TypeScript examples with type narrowing
- Multiple import strategies documentation
- **Switch Components**:
  - `<Switch>` - Container for switch logic with custom equality functions
  - `<Case>` - Individual case branches with single or multiple value matching
  - `<Default>` - Fallback branch for unmatched cases

### Changed

- Restructured library to support multiple bundles and import strategies
- Improved README structure with better organization
- Enhanced component documentation with real-world examples

## [0.2.0] - 2025-06-25

### Added

- **Collection Components**:
  - `<For>` - Advanced iteration component with filtering, sorting, pagination, and fallback support
- Enhanced documentation for For component usage and props
- Comprehensive examples showing filtering, sorting, limiting, and container elements

## [0.1.0] - 2025-06-25

### Added

- Initial release of react-statement-blocks
- **Conditional Components**:
  - `<Condition>` - Container for conditional logic
  - `<If>` - Primary condition branch with type narrowing support
  - `<ElseIf>` - Secondary condition branches
  - `<Else>` - Fallback branch
- **Core Features**:
  - Full TypeScript support with type safety and IntelliSense
  - Zero dependencies besides React
  - Function children support with automatic type narrowing
  - Comprehensive error handling and validation
  - React 19+ compatibility
- Package metadata including license, description, author, and repository information
- Basic documentation and usage examples

---

**Note**: This changelog follows the [Keep a Changelog](https://keepachangelog.com/) format. Each release includes:

- **Added**: New features
- **Changed**: Changes in existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security vulnerability fixes
