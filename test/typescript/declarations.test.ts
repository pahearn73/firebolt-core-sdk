import Setup from "../Setup"
import { sent } from "../Setup"

import { test, expect  } from "@jest/globals"
import { Lifecycle, Device, Discovery } from "../../dist/lib/firebolt";

let listenerId:number

test('Able to get TypeScript listenerId', () => {
    return Lifecycle.listen('inactive', () => {}).then((id:number) => {
        listenerId = id
        expect(listenerId > 0).toBe(true)
    })
})

test('Able to get resolution', () => {
    return Device.screenResolution().then( (res:[number, number]) => {
        expect(res[0]>0).toBe(true)
        expect(res[1]>0).toBe(true)
    })
})

test('purchaseContent', () => {
    return Discovery.purchasedContent({
        expires: '',
        totalCount: 5,
        entries: [
        ]
    }).then(() => {
        let result:Discovery.PurchasedContentResult = sent.find(message => message.method === 'purchasedContent').params.result
        expect(result.totalCount).toBe(5)
        expect(typeof result.totalCount).toBe('number')
    })
})
