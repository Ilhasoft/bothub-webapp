<p align="center">
    <img src="https://user-images.githubusercontent.com/5360835/65427083-1af35900-de01-11e9-86ef-59f1eee79a68.png" width="240" height="60" alt="Bothub" />
</p>

<p>
BotHub is an open platform for predicting, training and sharing NLU (Natural Language Understanding) datasets in multiple languages in a cooperative way.
</p>

# How to Contribute

Bothub is an open source project, so we made this document to make de the process for contributing clear and answers some questions that you may have.

## Branch Organization
You can  submit all changes to the `staging branch`, where we do whole our tests for new features

## Flags for your branch

To keep the `staging branch` in a releasable state, breaking changes and experimental features must be gated behind a feature flag.

#### New Feature
Use this flag to create a branch for news features
 - `feature/feature_name`

#### Bug fix
Use this flag to fix some bug
- `bugfix/bug_name`

#### Edit something
Use this flag to edit something
- `edit/edit_name`

## Your First Pull Request

Working on your first Pull Request? You can learn how from this free video series:
<p align="center">
<a href="https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github">
How to Contribute to an Open Source Project on GitHub
</a>
</p>

## Sending a Pull Request
The bothub's developers is monitoring for pull requests. We will review your pull request and either merge it, request changes to it, or close it with an explanation.

**Before submitting a pull request, please make sure the following is done:**

1.  Fork  [the repository](https://github.com/bothub-it/bothub-webapp)  and create your branch from  `master`.

2.  Run  `yarn`  in the repository root.

3.  If you’ve fixed a bug or added code that should be tested, add tests!

4.  Ensure the test suite passes (`yarn test`). Tip:  `yarn test --watch TestName`  is helpful in development.

5.  Make sure your code lints (`yarn lint`). 

6.  If everything is ready, send your PR to `staging branch`.

## License

- **[AGLP 3.0](https://github.com/bothub-it/bothub-webapp/blob/master/LICENSE)**
- Copyright 2020 ©  **<a href="https://github.com/bothub-iT">Bothub</a>**