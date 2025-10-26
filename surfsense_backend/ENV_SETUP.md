# Environment Variables Setup

Create a `.env` file in the `surfsense_backend` directory with the following variables:

## Required Variables

```env
# Database
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/surfsense

# Authentication
AUTH_TYPE=GOOGLE
GOOGLE_OAUTH_CLIENT_ID=your_google_client_id
GOOGLE_OAUTH_CLIENT_SECRET=your_google_client_secret
SECRET_KEY=your_secret_key_here

# LLM API Keys (Priority: Environment Variable > Database)
OPENAI_API_KEY=sk-your-openai-api-key

# Embedding Model
EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2
EMBEDDING_DIMENSION=384
```

## Optional LLM API Keys

```env
ANTHROPIC_API_KEY=your-anthropic-api-key
GROQ_API_KEY=your-groq-api-key
GOOGLE_API_KEY=your-google-api-key
COHERE_API_KEY=your-cohere-api-key
```

## How API Keys Work

The system now prioritizes environment variables over database-stored API keys:

1. **Environment Variable First**: If `OPENAI_API_KEY` is set in `.env`, it will be used
2. **Database Fallback**: If not set, the system falls back to the API key stored in the database (LLM Config)

### Benefits:
- ✅ Easier development setup
- ✅ More secure (keys not in database)
- ✅ Consistent across all users in development
- ✅ Still supports per-user keys via database in production

## Important Notes

### OpenAI API Key Format
- ✅ **Correct**: `sk-...` (User API key)
- ❌ **Wrong**: `sk-proj-...` (Project API key - not supported)

Get your API key at: https://platform.openai.com/api-keys

### Database URL Format
```
postgresql+asyncpg://username:password@host:port/database_name
```

Example:
```
postgresql+asyncpg://postgres:mypassword@localhost:5432/surfsense_db
```

## Quick Start

1. Copy this template to `.env`:
```bash
cd surfsense_backend
cat > .env << 'EOF'
DATABASE_URL=postgresql+asyncpg://postgres:password@localhost:5432/surfsense
AUTH_TYPE=GOOGLE
GOOGLE_OAUTH_CLIENT_ID=your_id
GOOGLE_OAUTH_CLIENT_SECRET=your_secret
SECRET_KEY=your_secret_key
OPENAI_API_KEY=sk-your-key
EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2
EMBEDDING_DIMENSION=384
EOF
```

2. Update the values with your actual credentials

3. Restart the backend server

## Troubleshooting

### "Incorrect API key provided"
- Check that your `OPENAI_API_KEY` starts with `sk-` (not `sk-proj-`)
- Verify the key is valid at https://platform.openai.com/api-keys

### "Expected string or URL object, got None"
- Make sure `DATABASE_URL` is set in `.env`
- Check the format is correct (see above)

### API key not being used
- Check the logs for: `Using API key from environment variable for OPENAI`
- If you see `Using API key from database`, the env var is not set
- Restart the backend after adding env vars

