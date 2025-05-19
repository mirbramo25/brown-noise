Alexa Brown Noise Skill - Final Package

Files:
- index.js: AWS Lambda handler code
- interaction-model.json: Alexa skill interaction model
- package.json: Node.js dependencies for Lambda
- brown-noise.mp3: Placeholder audio file (replace with real 30-min file)

Setup:
1. Upload your actual 30-minute 'brown-noise.mp3' to S3 at the root of bucket 'my-brown-noise-assets-123'.
2. Ensure the file is publicly readable via your bucket policy.
3. Deploy 'index.js' and 'package.json' to AWS Lambda (Node.js 14.x or higher).
   - Run `npm install` in the project folder before zipping to include node_modules.
4. In the Alexa Developer Console:
   - Create or open your skill, set invocation name to "noise".
   - In JSON Editor under Interaction Model, paste 'interaction-model.json'.
   - Build the model.
   - Under Endpoint, select the Lambda ARN of your deployed function.
5. Test on your Echo by saying: "Alexa, open noise" to start, "Alexa, stop" to end.

Replace the placeholder mp3 in this package with your real file if testing locally.