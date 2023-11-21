<!-- http://0.0.0.0:4446/post/11095385567333215065 -->

# Introduction

When it comes to NixOS systems, a pain point still lives on, in direct conflicts with a *nix* building principle: the `/nix/store`

A public directory where the everything required for the system is stored, where everybody can read what's inside,
when it comes to secret management, this is a real pain in the git.

A lot of people came up with solutions, and you can see the complete list on the
[dedicated nixos wiki page][secret_mgt_comparison].

However, I'm personally not very satisfied with these solutions as it doesn't match all my personal criteria:
- Have everything stored *inside my git* repository
- Have a very *simple setup* on a new machine (install NixOS base, git clone repo, upgrade system)
- Able to get the secrets from *inside the modules* of my system configuration
- *Easy* to modify said secrets.

All of it while keeping a sufficient security:
- Nothing plaintext inside the `/nix/store` directory
- Secure enough so I can push my secrets online without any fear
- Know where the weak points are, and particular scenarios where to put extra caution

So this is my attempt at a NixOS secrets management system satisfying all of the previously listed points.

> This is heavily based on [Xe's work on a similar subject][xe_article],
check out the post for more details, and many thanks to her for writing it !

## Presenting the workflow

In this section, I'll detail the "flow of secrets" between the built NixOS system,
the laptop that edited the nix files, and even the remote website hosting the git repository.

Note that I detail *without any particular* order, and leave out details about the implementation
on purpose as everything is explained thoroughly in the next sections.

![The flow chart for the secrets management inside NixOS](/images/attempt_nixos_secrets/secrets_flow.png)[width: "50%", style: "align-self: center"]

> The flow chart for the secrets that I'll cover and detail in the following sections

### In the NixOS system

When configuring NixOS, secrets are generally set using some kind of `services.X.adminPasswordFile = ...` setting.

Because of that, as long as secrets are reachable in the filesystem, everything can work well.  
So the idea is to store everything encrypted inside the `/nix/store`,
and *decrypt them to files* when the system is booting.  
This has the benefit of using the Linux file permissions system to secure who has access to what secrets.

To do all this, we will rely on a single central secret in our system, a RSA private key `/etc/secrets_key`,
secured using **read only permissions to root**, and that will be used at boot to decrypt the secrets.

> We consider that if a hacker *can read* the `/etc/secrets_key` using a vulnerability,
> the system is **already compromised**, and so it doesn't matter if it get access to the system's secrets.  

> The above note is only true if the system doesn't hold secrets that have *a wider scope* (credentials to other systems, etc ...)  
> An extra security layer may be needed in this case.

So the workflow is the following:
- When installing a new NixOS system, you copy the private key used to encrypt all secrets to `/etc/secrets_key`
- You secure the private key by changing the owner to `root:root` and the permissions to read only (400)
- When booting the system, a systemd service will iterate through the encrypted secrets required for the system to work
- Each secret is decrypted (using `rage`), the output is stored in a file (in the `/run/nixos-secrets` directory)
- Each secret is secured with its own owner, group and read/write permissions.

Seams straightforward ! But what about `users.users.<name>.passwordFile` ?  
It requires a specific format (same as `/etc/shadow` ones), how do I hold the encrypted password directly instead of having to transform it before ?

For this, the systemd service will have to perform an *optional transformation phase* on the secret before outputting it to a file.  
In this case, it's hashing the password to a suitable `/etc/shadow` format, but it could be anything depending on the needs.

### In the git repository

<!-- TODO This section -->

- Talk about how we want to access the (asymetricly) encrypted secrets inside the modules, and how we can manage it using a `json` file.
- Talk about how we can generate a NixOS module using this JSON file, in order to have secrets inside `config.secrets`, give an usage example.
- Talk about how we create the systemd service that will be used on NixOS using it.
- Talk about the private key stored somewhere safe (outside of git repo, or inside if encrypted with `git-crypt` or `gpg`)

## Bill of needed software

<!-- TODO This section -->

Talk about to pull this off we need:
- A way to edit manually the secrets, outputting the encrypted JSON file.
- Nix code to generate a NixOS module from the JSON file
- Nix code to generate systemd service from the secrets

# Storing plaintext secrets in the git repository

<!-- TODO This section -->

- Talk about the AES encryption for manual things, and asymmetrical encryption for the provision on the system
- Talk about how the strength of the security here will be the weakest of the 2 (AES / asymmetric), so require strong setup.
- Talk about the piece of software needed to handle this:
  - Encrypted JSON generator from the plaintext JSON (manage_secrets.py)
  - (optional) Plaintext JSON editor, to easily modify things (json_repl)

# Store encrypted secrets inside the nix store

<!-- TODO This section -->

- Talk about the NixOS module generated from the JSON file (nix lib I created)
- Talk about the systemd service generated from the secrets in config (nix lib I created)

# Workflow

## Editing secrets in the git repository

<!-- TODO This section -->

- Talk about how to generate a new key
- Talk about editing secrets manually

## Installing a new system

<!-- TODO This section -->

Using the NixOS official installer, then provide the secret root, then upgrade the system using our dotfiles.

# Assessing this solution

<!-- TODO This section -->

Explain the strengths:
- Configure system with secrets already provided as a module
- Have encrypted secrets inside the store
- Allow to freely modify the secrets manually
- Allow for extended usages (secret files and secrets transformations)

## Weaknesses in configuration

<!-- TODO This section -->

- Problem if /etc/secrets_key not well configured (root read only)
- Problem if unlocked dotfiles are open (TODO Find a linux file permission setup where only user can read / write in the repo)
- Problem if AES encryption for the plaintext secrets uses a weak password

## Weaknesses by vulnerabilities

<!-- TODO This section -->

Problem if following software have vulnerabilities:
- git-crypt
- rage
- AES encryption library

[xe_article]: https://xeiaso.net/blog/nixos-encrypted-secrets-2021-01-20/
[secret_mgt_comparison]: https://nixos.wiki/wiki/Comparison_of_secret_managing_schemes

<!-- TODO Get returns from Xe, Matthias Maschede -->
