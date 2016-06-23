# ecommerce

GQL -> aws serverless lambda w/dynamoDB

Moltin:
	Good:
		Category Hirarchy very good (brands and sub categories)
		Self hosted Images (need api to upload) [Cant pick relevat image must be ordered]
		modifiers / options are very extensive
		search is not that bad (category/title/description)
	Bad:
		Per product tax bands
		documentation is scattered
		no import functionality
		Needs custom flow to describe products in more detail (scrateches/no box/single pair...)
		Can't describe in store only (NY/LA)


Action plan:

	Move / Copy products db to moltin (sync tool scrapper)
		Create or Update but never duplicate
		Remove sold out
		Make sure categories and products are well organized (hirarchical structure)
	
	Backend:
		Mutations:
			Sales:
				taxjar ?
				shipping api ?
			Users
			Carts
			Hooks / udates to primary db

	GUI (static = no SSR)
		grab assets (html + css + js)
		convert to react components (w/props)
		Wire up the logic



Problems with site:
	uncategorized products
	empty categories / brands
	other payment methods (giropay)


