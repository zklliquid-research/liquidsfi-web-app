function ExplorerBanner() {
	return (
		<div className="flex-wrap items-center gap-4 p-4 mt-5 mb-6 md:flex md:flex-nowrap bg-[#04131F] rounded-2xl lg:pl-6">
			<img src="/Frame.svg" alt="" />

			<div>
				<h3 className="text-[28px] font-bold mt-4 md:mt-0">
					LiquidsFi Oracle Explorer
				</h3>
				<p className="mt-2 text-dark-100">
					Check out the most recent cross-chain message activity and browse the
					list of supported chains in this section
				</p>
			</div>
		</div>
	);
}

export default ExplorerBanner;
