import fetch from "node-fetch";

async function test() {
    const pollinationsUrl = `https://image.pollinations.ai/prompt/a%20test%20prompt`;
    console.log("Fetching...", pollinationsUrl);
    const res = await fetch(pollinationsUrl, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
    });
    console.log("Status:", res.status);
    if(!res.ok) {
        console.log("Error text:", await res.text());
    } else {
        console.log("Success!");
    }
}
test();
