async function compileForPlatform(target: string, outfile: string) {
  console.log(`Compiling for ${target}...`);
  const proc = Bun.spawn([
    "bun",
    "build",
    "./src/game/chuck-a-luck.js",
    "--compile",
    "--target",
    target,
    "--outfile",
    outfile,
  ]);

  const output = await new Response(proc.stdout).text();
  const error = await new Response(proc.stderr).text();

  console.log(`Compilation output for ${target}:`);
  console.log(output);

  if (error) {
    console.error(`Compilation errors for ${target}:`);
    console.error(error);
  } else {
    console.log(`Compilation successful for ${target}!`);
  }

  await proc.exited;
}

export async function compileGame() {
  const platforms = [
    { target: "bun-linux-x64", outfile: "executable/chuck-a-luck-linux-x64" },
    {
      target: "bun-linux-arm64",
      outfile: "executable/chuck-a-luck-linux-arm64",
    },
    {
      target: "bun-windows-x64",
      outfile: "executable/chuck-a-luck-windows-x64",
    },
    {
      target: "bun-darwin-arm64",
      outfile: "executable/chuck-a-luck-darwin-arm64",
    },
    { target: "bun-darwin-x64", outfile: "executable/chuck-a-luck-darwin-x64" },
  ];

  for (const platform of platforms) {
    await compileForPlatform(platform.target, platform.outfile);
  }

  console.log("Compilation for all platforms completed!");
}
await compileGame();
