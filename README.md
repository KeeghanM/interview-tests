# Interview Tests

A set of practical software engineering exercises focused on debugging, problem solving, application structure, and explaining trade-offs.

The full-stack tests are self-contained. Candidates need Node.js 22, npm and `uv`: no manually configured Python environment, Docker, database server, external service or API key is required.

Your interviewer will tell you which test to complete.

## Mid-Level React Developer (Test One)

```bash
npx degit KeeghanM/interview-tests/mid-level-react-1 interview-test
cd interview-test
npm install
npm run dev
```

## Mid-Level React Developer (Test Two)

```bash
npx degit KeeghanM/interview-tests/mid-level-react-2 interview-test
cd interview-test
npm install
npm run dev
```

## Mid-Level Python Developer

```bash
npx degit KeeghanM/interview-tests/mid-level-python-1 interview-test
cd interview-test
uv sync
uv run uvicorn app.main:app --reload
```

## Mid-Level Full-Stack Developer

```bash
npx degit KeeghanM/interview-tests/mid-level-full-stack interview-test
cd interview-test
npm install
npm run dev
```

## Senior Full-Stack Developer

```bash
npx degit KeeghanM/interview-tests/senior-full-stack interview-test
cd interview-test
npm install
npm run dev
```

## Senior React Developer

```bash
npx degit KeeghanM/interview-tests/senior-react-1 interview-test
cd interview-test
docker compose up --build
```

## Senior Python Developer

```bash
npx degit KeeghanM/interview-tests/senior-python-1 interview-test
cd interview-test
docker compose up --build
```
