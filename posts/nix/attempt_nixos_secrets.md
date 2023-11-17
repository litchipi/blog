# Introduction

Talk about how I'll cover the whole setup, and will then assess the weaknesses, considerations to take, etc ...

Talk about how this is a proposition and that should be reviewed, corrected and upgraded before being applicable to a wider audience. 

Objectives:
- Have a way to do everything using only the git repository
- Have the simplest installation process possible
- Allow for anyone who's able to modify his nixos config to use this setup without hassle

![The flow chart for the secrets management inside NixOS](/images/attempt_nixos_secrets/secrets_flow.png)[width: "50%", style: "align-self: center"]

## When to consider a secret secure

On the system where to dotfiles are stored:

- If hacker get access to the unlocked git dotfiles, we consider it's already hacked
- If hacker get access to /etc/secrets_key, we consider it's already hacked
- If a hacker can get (or bruteforce) the secrets from the remote repository, we consider it's already hacked

# Storing private keys inside the git repository

Git-crypt, gpg encryption, etc ...

Talk about the setup, and the scripts that we can use to lock / unlock this

# Editing the secrets manually

Inside the git repository

Talk about the piece of software needed to handle this (my own json_repl, and how it's linked in scripts)

# Store encrypted secrets inside the nix store

Rage, systemd service, etc ...

Talk about the piece of software needed to handle this (nixos-secrets nix library I created)

# Installing a new system

Using the NixOS official installer, then provide the secret root, then upgrade the system using our dotfiles.

# Assessing this solution

Explain the strenghts:
- Configure system with secrets already provided as a module
- Have encrypted secrets inside the store
- Allow to freely modify the secrets manually
- Allow for extended usages (secret files and secrets transformations)

## Weaknesses in configuration

- Problem if /etc/secrets_key not well configured (root read only)
- Problem if unlocked dotfiles are open (TODO Find a linux file permission setup where only user can read / write in the repo)
- Problem if AES encryption for the plaintext secrets uses a weak password

## Weaknesses by vulnerabilities

Problem if following software have vulnerabilities:
- git-crypt
- rage
- AES encryption library

[xe_article]: https://xeiaso.net/blog/nixos-encrypted-secrets-2021-01-20/
[secret_mgt_comparison]: https://nixos.wiki/wiki/Comparison_of_secret_managing_schemes
